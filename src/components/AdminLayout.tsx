import { Link, useLocation, useRouter } from "@tanstack/react-router";
import {
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Calendar,
  CheckSquare,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Star,
  DollarSign,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "POS", to: "/admin/pos", icon: ShoppingCart },
  { label: "Products", to: "/admin/products", icon: Package },
  { label: "Categories", to: "/admin/categories", icon: Package },
  { label: "Orders", to: "/admin/orders", icon: ShoppingCart },
  { label: "Customers", to: "/admin/customers", icon: Users },
  { label: "Finance", to: "/admin/finance", icon: TrendingUp },
  { label: "Suppliers", to: "/admin/suppliers", icon: Users },
  { label: "Purchase Orders", to: "/admin/purchase-orders", icon: Package },
  { label: "Reports", to: "/admin/reports", icon: TrendingUp },
  { label: "Loyalty", to: "/admin/loyalty", icon: Star },
  { label: "Reconciliation", to: "/admin/reconciliation", icon: DollarSign },
  { label: "Tasks", to: "/admin/ops/tasks", icon: CheckSquare },
  { label: "Calendar", to: "/admin/ops/calendar", icon: Calendar },
  { label: "Staff", to: "/admin/ops/staff", icon: Users },
  { label: "Activity", to: "/admin/ops/activity", icon: FileText },
  { label: "Content", to: "/admin/ops/content", icon: FileText },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between border-b border-border bg-background px-4 py-3 sticky top-0 z-40">
        <span className="font-semibold text-gold">Vicky's Place Admin</span>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-muted rounded-md"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-background border-r border-border shadow-lg overflow-y-auto">
            <div className="p-6">
              <h1 className="font-serif text-xl text-gold">Vicky's Place</h1>
              <p className="text-sm text-muted-foreground mt-1">Admin Console</p>
            </div>
            <AdminSidebarContent
              location={location}
              closeSidebar={() => setSidebarOpen(false)}
              collapsed={false}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div
        className={`hidden lg:block border-r border-border bg-background h-screen fixed top-0 left-0 flex-shrink-0 transition-all duration-300 z-30 ${sidebarCollapsed ? "w-16" : "w-64"}`}
      >
        <div className="p-6 flex items-center justify-between flex-shrink-0">
          <h1 className={`font-serif text-gold ${sidebarCollapsed ? "text-lg" : "text-xl"}`}>
            {sidebarCollapsed ? "VP" : "Vicky's Place"}
          </h1>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground"
            aria-label="Toggle sidebar"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
        {!sidebarCollapsed && (
          <p className="text-sm text-muted-foreground mt-1 px-6 flex-shrink-0">Admin Console</p>
        )}
        <div className="flex flex-col h-[calc(100vh-80px)]">
          <AdminSidebarContent
            location={location}
            collapsed={sidebarCollapsed}
            onExpand={() => setSidebarCollapsed(false)}
          />
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 overflow-auto lg:ml-0 ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"}`}>{children}</div>
    </div>
  );
}

function AdminSidebarContent({
  location,
  closeSidebar,
  collapsed,
  onExpand,
}: {
  location: { pathname: string };
  closeSidebar?: () => void;
  collapsed?: boolean;
  onExpand?: () => void;
}) {
  const router = useRouter();

  return (
    <nav className="px-4 py-2 flex flex-col h-full">
      <ul className="space-y-1 flex-1 overflow-y-auto py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          // Dashboard is only active on exact match, others can have nested routes
          const isActive =
            item.to === "/admin"
              ? location.pathname === "/admin"
              : location.pathname === item.to || location.pathname.startsWith(item.to + "/");
          return (
            <li key={item.to}>
              <button
                onClick={() => {
                  router.navigate({
                    to: item.to as
                      | "/"
                      | "/admin/pos"
                      | "/admin/products"
                      | "/admin/categories"
                      | "/admin/orders"
                      | "/admin/customers"
                      | "/admin/finance"
                      | "/admin/suppliers"
                      | "/admin/purchase-orders"
                      | "/admin/reports"
                      | "/admin/loyalty"
                      | "/admin/reconciliation"
                      | "/admin/ops/tasks"
                      | "/admin/ops/calendar"
                      | "/admin/ops/staff"
                      | "/admin/ops/activity"
                      | "/admin/ops/content",
                  });
                  closeSidebar?.();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-left ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                } ${collapsed ? "justify-center" : ""}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`${collapsed ? "h-5 w-5" : "h-4 w-4"}`} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            </li>
          );
        })}
      </ul>
      {collapsed && (
        <div className="mt-6 pt-6 border-t border-border flex justify-center">
          <button
            onClick={onExpand}
            className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground"
            aria-label="Expand sidebar"
            title="Expand sidebar"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
      <div className="mt-6 pt-6 border-t border-border">
        <button
          onClick={() => router.navigate({ to: "/" })}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left ${collapsed ? "justify-center" : ""}`}
          title={collapsed ? "Exit Admin" : undefined}
        >
          <LogOut className={`${collapsed ? "h-5 w-5" : "h-4 w-4"}`} />
          {!collapsed && <span>Exit Admin</span>}
        </button>
      </div>
    </nav>
  );
}
