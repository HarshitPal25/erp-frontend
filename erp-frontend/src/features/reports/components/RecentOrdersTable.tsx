import { useEffect, useState } from "react";
import { getRecentOrders, type RecentOrder } from "../../../services/api/dashboard";

export function RecentOrdersTable() {
  const [orders, setOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentOrders()
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 p-6 text-gray-900 dark:text-gray-100">
        Loading Orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-800 px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Recent Orders
          </h2>
        </div>
        <div className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
          No orders yet. Create your first order to see it here.
        </div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    Pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500',
    Approved: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
    'In Production': 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400',
    Completed: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400',
    Dispatched: 'bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-400',
    Cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400',
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 shadow-sm">
      <div className="border-b border-gray-200 dark:border-gray-800 px-5 py-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Orders
        </h2>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800/50 text-left text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
            <th className="p-3 font-medium text-sm">Order</th>
            <th className="p-3 font-medium text-sm">Customer</th>
            <th className="p-3 font-medium text-sm">Item</th>
            <th className="p-3 font-medium text-sm">Qty</th>
            <th className="p-3 font-medium text-sm">Status</th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-700 dark:text-gray-300">
          {orders.map((order) => (
            <tr
              key={order._id}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-800/50 transition-colors"
            >
              <td className="p-3">
                {order.orderNumber}
              </td>

              <td className="p-3">
                {order.customerName}
              </td>

              <td className="p-3">
                {order.itemName}
              </td>

              <td className="p-3">
                {order.quantityOrdered}
              </td>

              <td className="p-3">
                <span className={`rounded px-2 py-1 text-xs font-medium ${statusColors[order.status] || statusColors.Pending}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}