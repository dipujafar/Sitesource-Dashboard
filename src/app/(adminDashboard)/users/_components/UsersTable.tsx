"use client";

import { Input, Select, TableProps } from "antd";
import { Search } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import { useDebounce } from "use-debounce";

import DataTable from "@/utils/DataTable";
import BlockUser from "@/components/shared/BlockUser";
import { useGetAllUsersQuery } from "@/redux/api/usersApi";
import { cn } from "@/lib/utils";

type TDataType = {
  id: string;
  key?: string;
  name: string;
  email: string;
  status: string;
  role?: string;
  joiningDate?: string;
};

const UsersTable = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const [searchText, setSearchText] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("ALL");
  const [searchValue] = useDebounce(searchText, 500);

  const queryParams: Record<string, string> = {
    page,
    limit,
  };

  if (searchValue.trim()) {
    queryParams.searchTerm = searchValue.trim();
    queryParams.page = "1";
  }

  if (selectedRole && selectedRole !== "ALL") {
    queryParams.role = selectedRole;
    queryParams.page = "1";
  } else {
    delete queryParams.role;
  }

  const { data: usersData, isLoading } = useGetAllUsersQuery(queryParams);
  const users = usersData?.data?.users ?? [];

  const columns: TableProps<TDataType>["columns"] = [
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
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="flex items-center gap-x-2">
          <p>{text || "N/A"}</p>
          {record.status === "BLOCKED" && (
            <span
              className={cn(
                "px-2 py-0.5 rounded-sm text-[10px] font-medium uppercase bg-red-100 text-red-700",
              )}
            >
              {record.status}
            </span>
          )}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <p>{text || "N/A"}</p>,
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text) => <p>{text ? text.toLowerCase() : "N/A"}</p>,
    },
    {
      title: "Join Date",
      dataIndex: "joiningDate",
      render: (text) => (
        <p>{text ? moment(text).format("DD MMM YYYY") : "N/A"}</p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <BlockUser id={record.id} isActive={record.status === "ACTIVE"} />
      ),
    },
  ];

  return (
    <div className="bg-section-bg rounded-xl">
      <div className="md:flex items-center justify-between gap-3 py-4 px-2">
        <div className="flex flex-col md:flex-row items-center gap-2 ml-auto flex-1 max-w-[500px] border">
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<Search size={16} />}
            placeholder="Search users"
            className="!max-w-96 h-9 !bg-[#F7F6F4] flex-1"
          />
          <Select
            value={selectedRole}
            onChange={(value) => setSelectedRole(value)}
            placeholder="Role"
            className="!min-w-[140px]"
            options={[
              { value: "ALL", label: "All" },
              { value: "WORKER", label: "Worker" },
              { value: "EMPLOYER", label: "Employer" },
            ]}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={users}
        pageSize={Number(limit)}
        total={usersData?.data?.meta?.total}
        isLoading={isLoading}
      />
    </div>
  );
};

export default UsersTable;
