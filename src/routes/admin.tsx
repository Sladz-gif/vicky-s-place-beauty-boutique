import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Package, ShoppingCart, Users, TrendingUp, ArrowRight } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { mockActivityLog } from "@/data/mock/activityLog";
import { formatDateTime } from "@/data/api";
import type { ActivityLogEntry } from "@/data/types";

export const Route = createFileRoute("/admin")({
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
    <AdminLayout>
      <Outlet />
    </AdminLayout>
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
