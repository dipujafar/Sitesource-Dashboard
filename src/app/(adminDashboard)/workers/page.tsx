import React from "react";
import WorkersTable from "./_components/WorkerTable";

export default function WorkerPage() {
  return (
    <div>
      <div>
        <h1 className="text-xl font-semibold text-text-color mb-1">
          Workers
        </h1>
        <p className="text-primary-gray text-base font-normal">
          Manage all contractor accounts and verification status
        </p>
      </div>
      <WorkersTable />
    </div>
  );
}
