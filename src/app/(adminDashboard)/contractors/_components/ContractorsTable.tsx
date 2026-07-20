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
import { MapPin, Star, ArrowDownToLine } from "lucide-react";
import { CgUnblock } from "react-icons/cg";

const verificationStatus = ["Pending", "Suspended", "Verified"];

type TDataType = {
  key?: number;
  serial: number;
  regNumber: string;
  companyName: string;
  region: string;
  rating: number;
  activeJobs: number;
  verification: string;
  joined: string;
};

const data: TDataType[] = Array.from({ length: 20 }).map((_, inx) => ({
  key: inx,
  serial: inx + 1,
  regNumber: "ORD-12847",
  companyName: "Harrington Build Ltd",
  region: "London",
  rating: 4.8,
  activeJobs: [12, 2, 250, 800][inx % 4],
  joined: "05/04/2024",
  verification: verificationStatus[inx % 3],
}));

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Blocked the user");
};

const ContractorsTable = () => {
  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Reg. Number",
      dataIndex: "regNumber",
      render: (text) => <p className="font-medium">{text}</p>,
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      render: (text) => <p className="font-medium">{text}</p>,
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
      title: "Active Jobs",
      dataIndex: "activeJobs",
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

export default ContractorsTable;
