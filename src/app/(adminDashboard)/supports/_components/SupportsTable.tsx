"use client";

import { Input, TableProps, Image, Button } from "antd";
import { Search } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import { useDebounce } from "use-debounce";

import DataTable from "@/utils/DataTable";
import { useGetSupportsQuery } from "@/redux/api/supportsApi";
import Link from "next/link";

type TSupport = {
  id: string;
  subject: string;
  message: string;
  attachments?: string[];
  createdAt?: string;
  senderAuth?: {
    email?: string;
    profile?: {
      name?: string;
      image?: string | null;
    };
  };
};

const SupportsTable = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const [searchText, setSearchText] = useState("");
  const [searchValue] = useDebounce(searchText, 500);

  const queryParams: Record<string, string> = {
    page,
    limit,
  };

  if (searchValue.trim()) {
    queryParams.searchTerm = searchValue.trim();
    queryParams.page = "1";
  }

  const { data: supportsData, isLoading } = useGetSupportsQuery(queryParams);
  const supports = supportsData?.data?.supports ?? [];

  const columns: TableProps<TSupport>["columns"] = [
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
      title: "Sender",
      dataIndex: "senderAuth",
      render: (senderAuth) => {
        const name = senderAuth?.profile?.name || "User";
        const email = senderAuth?.email || "N/A";
        const image = senderAuth?.profile?.image;
        const initial = name.charAt(0).toUpperCase();

        return (
          <div className="flex items-center gap-3">
            {image ? (
              <Image
                src={image}
                alt={name}
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
              <span className="font-medium">{name}</span>
              <span className="text-xs text-gray-500">{email}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: "Subject",
      dataIndex: "subject",
      render: (text) => (
        <p className=" max-w-[300px]   font-medium">{text || "N/A"} </p>
      ),
    },
    {
      title: "Message",
      dataIndex: "message",
      render: (text) => (
        <p className="max-w-[300px]  text-sm text-gray-600">{text || "N/A"}</p>
      ),
    },
    {
      title: "Attachments",
      dataIndex: "attachments",
      render: (attachments: string[] = []) => (
        <div className="flex flex-wrap gap-2">
          {attachments.length ? (
            attachments.map((attachment, index) => (
              <a
                key={`${attachment}-${index}`}
                href={attachment}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
              >
                {attachments.length > 1 ? `View Doc ${index + 1}` : "View Doc"}
              </a>
            ))
          ) : (
            <span className="text-gray-400">No file</span>
          )}
        </div>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      render: (text) => (
        <p>{text ? moment(text).format("DD MMM YYYY") : "N/A"}</p>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id, record) => (
        <Link href={`mailto:${record?.senderAuth?.email}`}>
          <Button> Reply</Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="bg-section-bg rounded-xl">
      <div className="md:flex items-center justify-between gap-3 py-4 px-2">
        <div className="flex flex-col md:flex-row items-center gap-2 ml-auto">
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<Search size={16} />}
            placeholder="Search supports"
            className="!max-w-72 h-9 !bg-[#F7F6F4] lg:w-[500px]"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={supports}
        pageSize={Number(limit)}
        total={supportsData?.data?.meta?.total}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SupportsTable;
