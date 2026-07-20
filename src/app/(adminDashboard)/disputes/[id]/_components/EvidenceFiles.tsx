"use client";
import { Paperclip, FileText, Image as ImageIcon, Plus } from "lucide-react";

type TFile = {
  key: number;
  name: string;
  uploadedBy: string;
  size: string;
  type: "pdf" | "image";
};

const files: TFile[] = [
  {
    key: 1,
    name: "timesheet_june_w3.pdf",
    uploadedBy: "James Mitchell",
    size: "84 KB",
    type: "pdf",
  },
  {
    key: 2,
    name: "site_entry_log_june18.jpg",
    uploadedBy: "James Mitchell",
    size: "312 KB",
    type: "image",
  },
  {
    key: 3,
    name: "approved_timesheet_harrington.pdf",
    uploadedBy: "Harrington Build Ltd",
    size: "96 KB",
    type: "pdf",
  },
];

const EvidenceFiles = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-x-2">
          <Paperclip size={18} className="text-gray-500" />
          <h2 className="font-semibold text-gray-900">Evidence Files</h2>
        </div>
        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
          {files.length}
        </span>
      </div>

      <div className="flex-1 px-6 py-4 space-y-3">
        {files.map((file) => (
          <div
            key={file.key}
            className="flex items-center gap-x-3 border border-gray-100 rounded-2xl px-4 py-3 cursor-pointer hover:bg-gray-50"
          >
            <div
              className={`w-9 h-9 shrink-0 flex items-center justify-center rounded-lg ${
                file.type === "pdf" ? "bg-red-50" : "bg-blue-50"
              }`}
            >
              {file.type === "pdf" ? (
                <FileText size={18} className="text-red-500" />
              ) : (
                <ImageIcon size={18} className="text-blue-500" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{file.name}</p>
              <p className="text-xs text-gray-400">
                {file.uploadedBy} · {file.size}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 p-4">
        <button className="w-full flex items-center justify-center gap-x-2 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
          <Plus size={16} />
          Request Additional Evidence
        </button>
      </div>
    </div>
  );
};

export default EvidenceFiles;