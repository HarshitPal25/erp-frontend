import { useState, useEffect, type ElementType } from 'react';
import { ShoppingCart, Factory, Package, Truck, TrendingUp, TrendingDown } from 'lucide-react';
import clsx from 'clsx';
import { RecentOrdersTable } from './components/RecentOrdersTable';
import { QuickActions } from './components/QuickActions';
import { getDashboardStats, type DashboardStats } from '../../services/api/dashboard';

type Trend = 'up' | 'down' | 'neutral';

interface StatCardConfig {
  key: keyof DashboardStats;
  label: string;
  icon: ElementType;
  iconBg: string;
  iconColor: string;
}

const statConfigs: StatCardConfig[] = [
  {
    key: 'totalOrders',
    label: 'Total Orders',
    icon: ShoppingCart,
    iconBg: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    key: 'activeProduction',
    label: 'Active Production',
    icon: Factory,
    iconBg: 'bg-amber-50 dark:bg-amber-900/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    key: 'inventoryItems',
    label: 'Inventory Items',
    icon: Package,
    iconBg: 'bg-emerald-50 dark:bg-emerald-900/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    key: 'pendingDeliveries',
    label: 'Pending Deliveries',
    icon: Truck,
    iconBg: 'bg-violet-50 dark:bg-violet-900/20',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
];

function TrendBadge({ trend, label }: { trend: Trend; label: string }) {
  if (trend === 'up') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
        <TrendingUp size={12} />
        {label}
      </span>
    );
  }
  if (trend === 'down') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-red-500">
        <TrendingDown size={12} />
        {label}
      </span>
    );
  }
  return <span className="text-xs text-gray-400">{label}</span>;
}

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Overview of your operations today.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statConfigs.map((config) => {
          const Icon = config.icon;
          const stat = stats?.[config.key];
          const value = loading ? '...' : stat?.value?.toLocaleString() ?? '0';
          const sub = stat?.sub ?? '';
          const trend = stat?.trend ?? 'neutral';
          const trendLabel = stat?.trendLabel ?? '';

          return (
            <div
              key={config.key}
              className={clsx(
                'rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 px-5 py-4 shadow-sm transition-opacity',
                loading && 'animate-pulse'
              )}
            >
              <div className="flex items-start justify-between">
                <div className={clsx('flex h-10 w-10 items-center justify-center rounded-lg', config.iconBg)}>
                  <Icon size={20} className={config.iconColor} aria-hidden="true" />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
                <p className="mt-0.5 text-sm font-medium text-gray-600 dark:text-gray-400">{config.label}</p>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3">
                {!loading && <TrendBadge trend={trend} label={trendLabel} />}
                <span className="text-xs text-gray-400 dark:text-gray-500">{sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentOrdersTable />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}