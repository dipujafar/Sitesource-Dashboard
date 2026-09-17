"use client";

import { Input, Select, TableProps, message, Popconfirm, Image } from "antd";
import { Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import { useDebounce } from "use-debounce";
import DataTable from "@/utils/DataTable";
import { useGetJobsQuery, useDeleteJobMutation } from "@/redux/api/jobApi";
import { cn } from "@/lib/utils";

type TJob = {
  id: string;
  title: string;
  hourlyRate: number;
  employer?: {
    name?: string;
    email?: string;
    image?: string | null;
  };
  status?: string;
  postedAt?: string;
  location?: {
    coordinates?: number[];
  };
};

const JobsTable = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [searchValue] = useDebounce(searchText, 500);
  const [deleteJob] = useDeleteJobMutation();

  const queryParams: Record<string, string> = {
    page,
    limit,
  };

  if (searchValue.trim()) {
    queryParams.searchTerm = searchValue.trim();
    queryParams.page = "1";
  }

  if (selectedStatus && selectedStatus !== "ALL") {
    queryParams.status = selectedStatus;
    queryParams.page = "1";
  } else {
    delete queryParams.status;
  }

  const { data: jobsData, isLoading } = useGetJobsQuery(queryParams);
  const jobs = jobsData?.data?.jobs ?? [];

  const handleDelete = async (id: string) => {
    try {
      await deleteJob(id).unwrap();
      message.success("Job deleted successfully");
    } catch (error: any) {
      message.error(error?.data?.message || "Something went wrong");
    }
  };

  const columns: TableProps<TJob>["columns"] = [
    {
      title: "No.",
      dataIndex: "serial",
      render: (_, __, index) => (
        <p>
          {`# ${
            Number(page) === 1
              ? index + 1
              : (Number(page) - 1) * Number(limit) + index + 1
          }`}
        </p>
      ),
    },
    {
      title: "Job Title",
      dataIndex: "title",
      render: (text) => <p className="font-medium">{text || "N/A"}</p>,
    },
    {
      title: "Employer",
      dataIndex: "employer",
      render: (employer) => {
        const initial = (employer?.name || "U").charAt(0).toUpperCase();

        return (
          <div className="flex items-center gap-3">
            {employer?.image ? (
              <Image
                src={employer.image}
                alt={employer?.name || "Employer image"}
                width={36}
                height={36}
                className="!w-9 !h-9 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center text-sm font-semibold">
                {initial}
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-medium">{employer?.name || "N/A"}</span>
              <span className="text-xs text-gray-500">{employer?.email || "N/A"}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: "Rate",
      dataIndex: "hourlyRate",
      render: (text) => <p>${text ?? 0}/hr</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span
          className={cn(
            "px-2 py-1 rounded-full text-[10px] font-medium uppercase",
            text === "POSTED"
              ? "bg-blue-100 text-blue-700"
              : text === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : text === "INACTIVE"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-red-100 text-red-700",
          )}
        >
          {text || "N/A"}
        </span>
      ),
    },
    {
      title: "Posted Date",
      dataIndex: "postedAt",
      render: (text) => (
        <p>{text ? moment(text).format("DD MMM YYYY") : "N/A"}</p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Popconfirm
          title="Delete this job"
          description="Are you sure you want to delete this job?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <button
            type="button"
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="bg-section-bg rounded-xl">
      <div className="md:flex items-center justify-between gap-3 py-4 px-2">
        <div className="flex flex-col md:flex-row items-center gap-2 ml-auto flex-1 max-w-[500px]">
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<Search size={16} />}
            placeholder="Search jobs"
            className="!max-w-72 h-9 !bg-[#F7F6F4]"
          />
          <Select
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value)}
            placeholder="Status"
            className="!min-w-[150px]"
            options={[
              { value: "ALL", label: "All" },
              { value: "POSTED", label: "Posted" },
              { value: "ACTIVE", label: "Active" },
            ]}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={jobs}
        pageSize={Number(limit)}
        total={jobsData?.data?.meta?.total}
        isLoading={isLoading}
      />
    </div>
  );
};

export default JobsTable;
