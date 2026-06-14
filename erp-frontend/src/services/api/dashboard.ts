import { api } from './client';

export interface DashboardStat {
  value: number;
  sub: string;
  trend: 'up' | 'down' | 'neutral';
  trendLabel: string;
}

export interface DashboardStats {
  totalOrders: DashboardStat;
  activeProduction: DashboardStat;
  inventoryItems: DashboardStat;
  pendingDeliveries: DashboardStat;
}

export interface RecentOrder {
  _id: string;
  orderNumber: string;
  customerName: string;
  itemName: string;
  quantityOrdered: number;
  status: string;
  createdAt: string;
}

export async function getDashboardStats(): Promise<{ data: DashboardStats }> {
  try {
    const res = await api.get('/dashboard/stats');
    return { data: res.data.data };
  } catch (error) {
    console.error("Error fetching dashboard stats", error);
    return {
      data: {
        totalOrders: { value: 0, sub: 'This month', trend: 'neutral', trendLabel: 'Unable to load' },
        activeProduction: { value: 0, sub: 'Jobs in progress', trend: 'neutral', trendLabel: 'Unable to load' },
        inventoryItems: { value: 0, sub: 'Across 0 categories', trend: 'neutral', trendLabel: 'Unable to load' },
        pendingDeliveries: { value: 0, sub: 'Awaiting dispatch', trend: 'neutral', trendLabel: 'Unable to load' },
      },
    };
  }
}

export async function getRecentOrders(): Promise<{ data: RecentOrder[] }> {
  try {
    const res = await api.get('/dashboard/recent-orders');
    return { data: res.data.data };
  } catch (error) {
    console.error("Error fetching recent orders", error);
    return { data: [] };
  }
}
