import { createFileRoute, Link } from "@tanstack/react-router";
import { Save } from "lucide-react";
import { formatPrice } from "@/data/api";
import { mockOrders } from "@/data/mock/orders";
import { AdminLayout } from "@/components/AdminLayout";
import type { Order } from "@/data/types";
import { useState } from "react";

export const Route = createFileRoute("/admin/finance/tax")({
  head: () => ({
    meta: [
      { title: "Tax Settings — Admin Dashboard" },
      {
        name: "description",
        content: "Manage tax settings for Vicky's Place.",
      },
    ],
  }),
  component: AdminTax,
});

function AdminTax() {
  const [vatRate, setVatRate] = useState(12.5); // Ghana VAT rate as percentage
  const [taxId, setTaxId] = useState("GH123456789");

  const totalSales = mockOrders.reduce((sum: number, order: Order) => sum + order.total, 0);
  const totalVatCollected = (totalSales * vatRate) / 100;
  const totalVatPayable = totalVatCollected; // Simplified for mock data

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
          <h1 className="text-2xl md:text-3xl">Tax Settings</h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-serif text-lg mb-6">Tax Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">VAT Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={vatRate}
                onChange={(e) => setVatRate(parseFloat(e.target.value))}
                className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">Current Ghana VAT rate</p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Tax ID</label>
              <input
                type="text"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              />
            </div>
            <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep">
              <Save className="h-4 w-4" />
              Save Settings
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-serif text-lg mb-6">Tax Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Total Sales</span>
              <span className="font-semibold">{formatPrice(totalSales)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">VAT Rate</span>
              <span className="font-semibold">{vatRate}%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">VAT Collected</span>
              <span className="font-semibold text-green-600">{formatPrice(totalVatCollected)}</span>
            </div>
            <div className="flex justify-between items-center py-4 bg-primary/5">
              <span className="font-bold">VAT Payable</span>
              <span className="font-bold text-lg">{formatPrice(totalVatPayable)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-card p-6">
        <h3 className="font-serif text-lg mb-4">Tax Information</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">VAT Registration:</strong> Registered under Ghana
            Revenue Authority
          </p>
          <p>
            <strong className="text-foreground">Filing Period:</strong> Monthly
          </p>
          <p>
            <strong className="text-foreground">Due Date:</strong> 15th of following month
          </p>
          <p>
            <strong className="text-foreground">Note:</strong> This is a mock tax configuration for
            demonstration purposes. Actual tax rates and regulations should be verified with the
            Ghana Revenue Authority.
          </p>
        </div>
      </div>
    </div>
  );
}
