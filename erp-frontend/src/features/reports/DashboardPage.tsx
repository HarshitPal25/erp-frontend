export function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow">
          Total Orders
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          Inventory
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          Production
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          Revenue
        </div>
      </div>
    </div>
  );
}