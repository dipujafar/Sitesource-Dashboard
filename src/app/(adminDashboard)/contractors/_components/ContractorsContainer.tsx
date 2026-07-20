import React from "react";
import ContractorsTable from "./ContractorsTable";

export default function ContractorsContainer() {
  return (
    <div>
      <div>
        <h1 className="text-xl font-semibold text-text-color mb-1">
          Contractors
        </h1>
        <p className="text-primary-gray text-base font-normal">
          Manage all contractor accounts and verification status</p>
      </div>
      <ContractorsTable />
    </div>
  );
}
