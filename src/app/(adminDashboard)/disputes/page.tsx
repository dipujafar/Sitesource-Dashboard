import React from "react";
import DisputesTable from "./_components/DisputesTable";

export default function DisputePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold text-text-color mb-1">Disputes</h1>
        <p className="text-primary-gray text-base font-normal">
          Review and resolve payment and engagement disputes between workers and
          contractors
        </p>
      </div>
      <DisputesTable />
    </div>
  );
}
