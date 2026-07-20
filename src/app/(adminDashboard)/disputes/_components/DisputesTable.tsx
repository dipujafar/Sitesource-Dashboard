"use client";
import { Button, Input, TableProps } from "antd";
import DataTable from "@/utils/DataTable";
import { ArrowDownToLine, ArrowRight } from "lucide-react";
import Link from "next/link";

const cisStatus = ["Under review", "Submitted", "Resolved"];

const reasons = [
  "Worker claims 8 extra hours not reflected in approved timesheet",
  "Contractor claims work quality was substandard and requests...",
  "Worker states contractor cancelled engagement without...",
];

type TDataType = {
  key?: number;
  serial: number;
  disputeId: string;
  engId: string;
  companyName: string;
  workerName: string;
  reason: string;
  cisStatus: string;
};

const data: TDataType[] = Array.from({ length: 20 }).map((_, inx) => ({
  key: inx,
  serial: inx + 1,
  disputeId: "DSP-001",
  engId: "ORD-12847",
  companyName: "Harrington Build Ltd",
  workerName: "Cameron Williamson",
  reason: reasons[inx % 3],
  cisStatus: cisStatus[inx % 3],
}));

const cisBadge: Record<string, string> = {
  "Under review": "bg-yellow-50 text-yellow-600",
  Submitted: "bg-red-50 text-red-500",
  Resolved: "bg-green-50 text-green-600",
};

const DisputesTable = () => {
  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Dispute ID",
      dataIndex: "disputeId",
      render: (text) => <p className="font-medium">{text}</p>,
    },
    {
      title: "Eng ID",
      dataIndex: "engId",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      render: (text) => <p className="font-medium">{text}</p>,
    },
    {
      title: "Worker Name",
      dataIndex: "workerName",
      render: (text) => <p className="font-medium">{text}</p>,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      render: (text) => <p className="max-w-[280px] text-gray-700">{text}</p>,
    },
    {
      title: "CIS Status",
      dataIndex: "cisStatus",
      render: (text) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${cisBadge[text]}`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_) => (
        <Link href={"/disputes/1"}>
          <button className="flex items-center gap-x-1 text-sky-500 font-medium cursor-pointer">
            View <ArrowRight size={14} />
          </button>
        </Link>
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

export default DisputesTable;
