import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Filter, Eye, LayoutGrid, Table } from "lucide-react";
import { mockOrders } from "@/data/mock/orders";
import { formatPrice } from "@/data/api";
import type { Order } from "@/data/types";
import { useState } from "react";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      { title: "Orders — Admin Dashboard" },
      {
        name: "description",
        content: "Manage orders for Vicky's Place.",
      },
    ],
  }),
  component: AdminOrders,
});

function AdminOrders() {
  const [view, setView] = useState<"table" | "board">("table");
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const orders = mockOrders;

  const filteredOrders = orders.filter((order: Order) => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "paid":
        return "bg-blue-100 text-blue-600";
      case "fulfilled":
        return "bg-purple-100 text-purple-600";
      case "shipped":
        return "bg-indigo-100 text-indigo-600";
      case "delivered":
        return "bg-green-100 text-green-600";
      case "returned":
        return "bg-orange-100 text-orange-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const statusColumns: Order["status"][] = [
    "pending",
    "paid",
    "fulfilled",
    "shipped",
    "delivered",
    "returned",
    "cancelled",
  ];

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            Admin
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <h1 className="text-2xl md:text-3xl">Orders</h1>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-md border border-border bg-card pl-10 pr-4 text-sm outline-none focus:border-primary"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm hover:border-primary"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
        {showFilters && (
          <div className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Order["status"] | "all")}
              className="bg-transparent text-sm outline-none"
            >
              <option value="all">All Status</option>
              {statusColumns.map((status) => (
                <option key={status} value={status} className="capitalize">
                  {status}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex items-center gap-2 rounded-md border border-border bg-card p-1">
          <button
            onClick={() => setView("table")}
            className={`p-2 rounded-md ${view === "table" ? "bg-muted" : "hover:bg-muted/50"}`}
            title="Table view"
          >
            <Table className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("board")}
            className={`p-2 rounded-md ${view === "board" ? "bg-muted" : "hover:bg-muted/50"}`}
            title="Board view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </div>

      {view === "table" ? (
        <div className="rounded-lg border border-border bg-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-semibold">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Items</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order: Order) => (
                <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-4 font-semibold">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold">{order.customerName || "Guest"}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customerEmail || "N/A"}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{order.placedAt.split("T")[0]}</td>
                  <td className="px-6 py-4 text-sm">{order.items.length} items</td>
                  <td className="px-6 py-4 text-sm font-semibold">{formatPrice(order.total)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="p-2 hover:bg-muted rounded-md"
                      title="View order"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-4 overflow-x-auto">
          {statusColumns.map((status) => (
            <div key={status} className="flex-shrink-0 w-80">
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold capitalize">{status}</h3>
                  <span className="rounded-full bg-muted px-2 py-1 text-xs font-semibold">
                    {filteredOrders.filter((o: Order) => o.status === status).length}
                  </span>
                </div>
                <div className="space-y-3">
                  {filteredOrders
                    .filter((o: Order) => o.status === status)
                    .map((order: Order) => (
                      <Link
                        key={order.id}
                        to={`/admin/orders/${order.id}`}
                        className="block rounded-lg border border-border bg-muted/30 p-4 hover:border-primary transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{order.id}</span>
                          <span className="text-sm text-muted-foreground">
                            {order.placedAt.split("T")[0]}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.customerName || "Guest"}
                        </p>
                        <p className="text-sm font-semibold mt-2">{formatPrice(order.total)}</p>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
