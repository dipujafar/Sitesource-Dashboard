import UsersTable from "./_components/UsersTable";

export default function UsersPage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-text-color mb-1">Users</h1>
        <p className="text-primary-gray text-base font-normal">
          Manage all user accounts and account status
        </p>
      </div>
      <UsersTable />
    </div>
  );
}
