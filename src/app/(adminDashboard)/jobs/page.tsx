import JobsTable from "./_components/JobsTable";

export default function JobsPage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-text-color mb-1">Jobs</h1>
        <p className="text-primary-gray text-base font-normal">
          Manage all posted jobs and job status
        </p>
      </div>
      <JobsTable />
    </div>
  );
}
