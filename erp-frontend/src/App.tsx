import { Routes, Route, Navigate } from "react-router-dom";

import { AppLayout } from "./app/layout/AppLayout";
import { DashboardPage } from "./features/reports/DashboardPage";
import { OrdersPage } from "./features/orders/OrdersPage";
import { CustomersPage } from "./features/customers/CustomersPage";
import { InventoryPage } from "./features/inventory/InventoryPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;