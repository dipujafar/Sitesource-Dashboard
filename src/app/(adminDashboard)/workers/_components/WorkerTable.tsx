"use client";
import {
  Button,
  Input,
  message,
  Popconfirm,
  PopconfirmProps,
  TableProps,
} from "antd";
import DataTable from "@/utils/DataTable";
import { MapPin, Star, ArrowDownToLine, ArrowRight } from "lucide-react";
import { CgUnblock } from "react-icons/cg";

const trades = ["Electrician", "Plumber"];
const availabilityStatus = ["Available", "Unavailable"];
const cisStatus = ["Pending", "Suspended", "Verified"];

type TDataType = {
  key?: number;
  serial: number;
  workerName: string;
  trade: string;
  experience: string;
  region: string;
  rating: number;
  availability: string;
  cisStatus: string;
  joined: string;
};

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Blocked the user");
};

const data: TDataType[] = Array.from({ length: 20 }).map((_, inx) => ({
  key: inx,
  serial: inx + 1,
  workerName: "Cameron Williamson",
  trade: trades[inx % 2],
  experience: "6 Years",
  region: "London",
  rating: 4.8,
  joined: "05/04/2024",
  availability: availabilityStatus[inx % 2],
  cisStatus: cisStatus[inx % 3],
}));

const availabilityBadge: Record<string, string> = {
  Available: "bg-green-50 text-green-600",
  Unavailable: "bg-red-50 text-red-500",
};

const cisBadge: Record<string, string> = {
  Pending: "bg-yellow-50 text-yellow-600",
  Suspended: "bg-red-50 text-red-500",
  Verified: "bg-green-50 text-green-600",
};

const WorkersTable = () => {
  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Worker Name",
      dataIndex: "workerName",
      render: (text) => <p className="font-medium">{text}</p>,
    },
    {
      title: "Trade",
      dataIndex: "trade",
    },
    {
      title: "Experience",
      dataIndex: "experience",
    },
    {
      title: "Region",
      dataIndex: "region",
      render: (text) => (
        <div className="flex items-center gap-x-1 text-gray-500">
          <MapPin size={14} />
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "Ratings",
      dataIndex: "rating",
      render: (text) => (
        <div className="flex items-center gap-x-1">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "Availability",
      dataIndex: "availability",
      render: (text) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${availabilityBadge[text]}`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "CIS Status",
      dataIndex: "cisStatus",
      render: (text) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${cisBadge[text]}`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Joined",
      dataIndex: "joined",
      render: (text) => <p className="text-gray-500">{text}</p>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_) => (
        <Popconfirm
          title="Block the user"
          description="Are you sure to block this user?"
          onConfirm={confirmBlock}
          okText="Yes"
          cancelText="No"
        >
          <CgUnblock size={22} color="#CD0335" />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="bg-section-bg rounded-3xl">
      <div className="flex justify-end items-center gap-2 px-2 mb-2 pt-2">
        <Input.Search
          placeholder="Search here..."
          size="large"
          className="!max-w-[400px]"
        />
        <Button
          className="cursor-pointer !bg-transparent !text-[#4A5565] !border-2 !border-black"
          type="primary"
          icon={<ArrowDownToLine size={18} />}
        >
          Export
        </Button>
      </div>
      <DataTable columns={columns} data={data} pageSize={10}></DataTable>
    </div>
  );
};

export default WorkersTable;
