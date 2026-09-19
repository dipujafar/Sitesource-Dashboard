import SupportsTable from "./_components/SupportsTable";

export default function SupportsPage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-text-color mb-1">Support</h1>
        <p className="text-primary-gray text-base font-normal">
          Manage all support requests and customer conversations
        </p>
      </div>
      <SupportsTable />
    </div>
  );
}
