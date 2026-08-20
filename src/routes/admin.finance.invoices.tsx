import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Download, Eye } from "lucide-react";
import { mockOrders } from "@/data/mock/orders";
import { formatPrice } from "@/data/api";
import { AdminLayout } from "@/components/AdminLayout";
import type { Order } from "@/data/types";

export const Route = createFileRoute("/admin/finance/invoices")({
  head: () => ({
    meta: [
      { title: "Invoices — Admin Dashboard" },
      {
        name: "description",
        content: "Manage invoices for Vicky's Place.",
      },
    ],
  }),
  component: AdminInvoices,
});

function AdminInvoices() {
  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            Admin
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link to="/admin/finance" className="text-sm text-muted-foreground hover:text-foreground">
            Finance
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <h1 className="text-2xl md:text-3xl">Invoices</h1>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep">
          <Plus className="h-4 w-4" />
          Generate Invoice
        </button>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-sm font-semibold">Invoice #</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Order</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order: Order) => (
              <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                <td className="px-6 py-4 font-semibold">INV-{order.id.replace("ORD-", "")}</td>
                <td className="px-6 py-4 text-sm">{order.id}</td>
                <td className="px-6 py-4 text-sm">{order.customerName || "Guest"}</td>
                <td className="px-6 py-4 text-sm">{order.placedAt.split("T")[0]}</td>
                <td className="px-6 py-4 text-sm font-semibold">{formatPrice(order.total)}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                    Paid
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-muted rounded-md" title="View invoice">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-md" title="Download PDF">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-card p-6">
        <h3 className="font-serif text-lg mb-4">Invoice Summary</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Total Invoiced</p>
            <p className="text-2xl font-bold">
              {formatPrice(mockOrders.reduce((sum: number, order: Order) => sum + order.total, 0))}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Paid</p>
            <p className="text-2xl font-bold text-green-600">
              {formatPrice(mockOrders.reduce((sum: number, order: Order) => sum + order.total, 0))}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">₵0.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
