import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, ShoppingCart, Users, TrendingUp, ArrowRight } from "lucide-react";
import { mockActivityLog } from "@/data/mock/activityLog";
import { formatDateTime } from "@/data/api";
import type { ActivityLogEntry } from "@/data/types";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Vicky's Place" },
      {
        name: "description",
        content: "Manage products, orders, and customers for Vicky's Place.",
      },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <div>
          <h1 className="text-xl lg:text-2xl md:text-3xl">Dashboard</h1>
        </div>
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          Back to store
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Revenue"
          value="₵45,230"
          change="+12.5%"
          icon={TrendingUp}
          positive
        />
        <DashboardCard
          title="Total Orders"
          value="234"
          change="+8.2%"
          icon={ShoppingCart}
          positive
        />
        <DashboardCard title="Products" value="16" change="Active" icon={Package} />
        <DashboardCard title="Customers" value="89" change="+15" icon={Users} positive />
      </div>

      <div className="mt-8 lg:mt-12 grid gap-6 lg:gap-8 lg:grid-cols-2">
        <SectionCard title="Recent Orders" link="/admin/orders" linkText="View all orders">
          <div className="space-y-4">
            {[
              { id: "ORD-001", customer: "Ama Mensah", total: "₵120", status: "Pending" },
              { id: "ORD-002", customer: "Kofi Asante", total: "₵85", status: "Shipped" },
              { id: "ORD-003", customer: "Abena Osei", total: "₵210", status: "Delivered" },
              { id: "ORD-004", customer: "Kwame Boateng", total: "₵45", status: "Pending" },
            ].map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
              >
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{order.total}</p>
                  <p className="text-sm text-muted-foreground">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Low Stock Alerts" link="/admin/products" linkText="Manage products">
          <div className="space-y-4">
            {[
              { name: "Glow Serum", stock: 3, threshold: 5 },
              { name: "Hydrating Mist", stock: 2, threshold: 5 },
              { name: "Night Cream", stock: 4, threshold: 5 },
            ].map((product) => (
              <div
                key={product.name}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
              >
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.stock} left (threshold: {product.threshold})
                  </p>
                </div>
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                  Low Stock
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Recent Activity"
          link="/admin/ops/activity"
          linkText="View all activity"
        >
          <div className="space-y-4">
            {mockActivityLog.slice(0, 5).map((entry: ActivityLogEntry) => (
              <div
                key={entry.id}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold">{entry.staffName}</span>
                    <span className="text-muted-foreground"> {entry.action} </span>
                    <span className="font-semibold">{entry.entityName}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDateTime(entry.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  change,
  icon: Icon,
  positive,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  positive?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <span
          className={`text-xs font-semibold ${
            positive ? "text-green-600" : "text-muted-foreground"
          }`}
        >
          {change}
        </span>
      </div>
      <p className="mt-4 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{title}</p>
    </div>
  );
}

function SectionCard({
  title,
  link,
  linkText,
  children,
}: {
  title: string;
  link: string;
  linkText: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg">{title}</h3>
        <Link to={link} className="text-sm text-primary hover:underline">
          {linkText} →
        </Link>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
