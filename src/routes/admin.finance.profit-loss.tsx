import { createFileRoute, Link } from "@tanstack/react-router";
import { formatPrice } from "@/data/api";
import { mockOrders } from "@/data/mock/orders";
import { mockFinanceTransactions as mockFinanceTx } from "@/data/mock/finance";
import { AdminLayout } from "@/components/AdminLayout";
import type { FinanceTransaction, Order } from "@/data/types";
import { Download } from "lucide-react";

export const Route = createFileRoute("/admin/finance/profit-loss")({
  head: () => ({
    meta: [
      { title: "Profit & Loss — Admin Dashboard" },
      {
        name: "description",
        content: "View profit and loss statement for Vicky's Place.",
      },
    ],
  }),
  component: AdminProfitLoss,
});

function AdminProfitLoss() {
  // Calculate revenue from orders
  const totalRevenue = mockOrders.reduce((sum: number, order: Order) => sum + order.total, 0);

  // Calculate expenses from finance transactions
  const totalExpenses = mockFinanceTx
    .filter((t: FinanceTransaction) => t.type === "expense")
    .reduce((sum: number, t: FinanceTransaction) => sum + t.amount, 0);

  // Calculate COGS (Cost of Goods Sold) - simplified for mock data
  // In a real app, this would come from product cost prices
  const cogs = totalRevenue * 0.4; // Assuming 40% COGS

  const grossProfit = totalRevenue - cogs;
  const operatingProfit = grossProfit - totalExpenses;
  const netProfit = operatingProfit;

  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  const handleExportCSV = () => {
    const headers = ["Item", "Amount"];
    const rows = [
      ["Revenue", totalRevenue],
      ["COGS", -cogs],
      ["Gross Profit", grossProfit],
      ["Operating Expenses", -totalExpenses],
      ["Net Profit", netProfit],
    ];
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "profit-loss.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

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
          <h1 className="text-2xl md:text-3xl">Profit & Loss</h1>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm hover:border-primary"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Net Profit</h3>
          <p className={`text-3xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
            {formatPrice(netProfit)}
          </p>
          <p className="text-sm text-muted-foreground mt-2">Margin: {profitMargin.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Gross Profit</h3>
          <p className="text-3xl font-bold">{formatPrice(grossProfit)}</p>
          <p className="text-sm text-muted-foreground mt-2">Revenue: {formatPrice(totalRevenue)}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-600">{formatPrice(totalExpenses)}</p>
          <p className="text-sm text-muted-foreground mt-2">COGS: {formatPrice(cogs)}</p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h3 className="font-serif text-lg">Profit & Loss Statement</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="font-semibold">Revenue</span>
              <span className="font-semibold">{formatPrice(totalRevenue)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Cost of Goods Sold (COGS)</span>
              <span className="text-red-600">-{formatPrice(cogs)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border bg-muted/30">
              <span className="font-semibold">Gross Profit</span>
              <span className="font-semibold">{formatPrice(grossProfit)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Operating Expenses</span>
              <span className="text-red-600">-{formatPrice(totalExpenses)}</span>
            </div>
            <div className="flex justify-between items-center py-4 bg-primary/5">
              <span className="font-bold text-lg">Net Profit</span>
              <span
                className={`font-bold text-lg ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {formatPrice(netProfit)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h3 className="font-serif text-lg">Expense Breakdown</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {Object.entries(
              mockFinanceTx
                .filter((t: FinanceTransaction) => t.type === "expense")
                .reduce((acc: Record<string, number>, t: FinanceTransaction) => {
                  acc[t.category] = (acc[t.category] || 0) + t.amount;
                  return acc;
                }, {}),
            ).map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center py-2">
                <span className="text-sm capitalize">{category}</span>
                <span className="text-sm font-semibold">{formatPrice(amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
