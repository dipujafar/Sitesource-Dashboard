import React from "react";
import TimeSheetsTable from "./_components/TimeSheetsTable";

export default function TimeSheetsPage() {
  return (
    <div>
      <div>
        <h1 className="text-xl font-semibold text-text-color mb-1">
          Time Sheet
        </h1>
        <p className="text-primary-gray text-base font-normal">
          Manage all contractor accounts and verification status
        </p>
      </div>
      <TimeSheetsTable />
    </div>
  );
}
