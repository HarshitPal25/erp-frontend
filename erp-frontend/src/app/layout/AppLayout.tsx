import { Outlet, NavLink } from 'react-router-dom';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white p-4">
        <h1 className="text-xl font-bold">ERP</h1>

        <nav className="mt-6 flex flex-col gap-2">
          <NavLink className="rounded-lg px-3 py-2 hover:bg-gray-100" to="/">Dashboard</NavLink>
          <NavLink className="rounded-lg px-3 py-2 hover:bg-gray-100" to="/orders">Orders</NavLink>
          <NavLink className="rounded-lg px-3 py-2 hover:bg-gray-100" to="/customers">Customers</NavLink>
          <NavLink className="rounded-lg px-3 py-2 hover:bg-gray-100" to="/inventory">Inventory</NavLink>
        </nav>
      </aside>

      <main className="ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
}