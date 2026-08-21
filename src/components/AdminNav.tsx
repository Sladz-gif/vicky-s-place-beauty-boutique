import { Link, useLocation } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/admin";
import { LogOut, Menu } from "lucide-react";
import { useState, useMemo, useCallback } from "react";

interface NavItem {
  label: string;
  to: string;
  module: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", to: "/admin", module: "" },
  { label: "POS", to: "/admin/pos", module: "inventory" },
  { label: "Products", to: "/admin/products", module: "inventory" },
  { label: "Categories", to: "/admin/categories", module: "inventory" },
  { label: "Orders", to: "/admin/orders", module: "orders" },
  { label: "Customers", to: "/admin/customers", module: "orders" },
  { label: "Finance", to: "/admin/finance", module: "finance" },
  { label: "Tasks", to: "/admin/ops/tasks", module: "ops" },
  { label: "Calendar", to: "/admin/ops/calendar", module: "ops" },
  { label: "Staff", to: "/admin/ops/staff", module: "ops" },
  { label: "Activity", to: "/admin/ops/activity", module: "ops" },
  { label: "Content", to: "/admin/ops/content", module: "ops" },
];

export function AdminNav() {
  const { staff, hasModuleAccess, logout } = useAdminAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredNavItems = useMemo(() => {
    return navItems.filter((item) => {
      // Dashboard is always visible
      if (item.module === "") return true;
      // Filter by module access
      return hasModuleAccess(item.module);
    });
  }, [hasModuleAccess]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <nav className="flex items-center gap-6 border-b border-border bg-background px-5 py-4 sm:px-8">
      <div className="flex items-center gap-4">
        <span className="label-caps text-gold">Admin</span>
        <div className="hidden sm:flex items-center gap-4">
          {filteredNavItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`label-caps text-sm transition-colors hover:text-primary-deep ${
                location.pathname === item.to ? "text-espresso" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="ml-auto flex items-center gap-4">
        {staff && (
          <span className="hidden sm:inline text-sm text-muted-foreground">{staff.name}</span>
        )}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
        <button
          onClick={toggleMobileMenu}
          className="sm:hidden p-2 hover:bg-muted rounded-md"
        >
          <Menu className="h-5 w-5" />
        </button>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 sm:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={closeMobileMenu}
            />
            <div className="absolute right-0 top-0 h-full w-64 bg-background p-6 shadow-lg">
              <div className="flex flex-col gap-4">
                {staff && <span className="text-sm text-muted-foreground">{staff.name}</span>}
                {filteredNavItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMobileMenu}
                    className={`label-caps text-sm transition-colors hover:text-primary-deep ${
                      location.pathname === item.to ? "text-espresso" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
