import { createFileRoute, Link } from "@tanstack/react-router";
import { formatPrice } from "@/data/api";
import { mockFinanceTransactions as mockFinanceTx } from "@/data/mock/finance";
import { AdminLayout } from "@/components/AdminLayout";
import type { FinanceTransaction } from "@/data/types";
import { Download } from "lucide-react";

export const Route = createFileRoute("/admin/finance/cash-flow")({
  head: () => ({
    meta: [
      { title: "Cash Flow — Admin Dashboard" },
      {
        name: "description",
        content: "View cash flow for Vicky's Place.",
      },
    ],
  }),
  component: AdminCashFlow,
});

function AdminCashFlow() {
  // Group transactions by date
  const transactionsByDate = mockFinanceTx.reduce(
    (acc: Record<string, { revenue: number; expense: number }>, t: FinanceTransaction) => {
      if (!acc[t.date]) {
        acc[t.date] = { revenue: 0, expense: 0 };
      }
      if (t.type === "revenue") {
        acc[t.date].revenue += t.amount;
      } else {
        acc[t.date].expense += t.amount;
      }
      return acc;
    },
    {},
  );

  const sortedDates = Object.keys(transactionsByDate).sort();

  // Find max value for chart scaling
  const maxValue = Math.max(
    ...Object.values(transactionsByDate).map((v) => Math.max(v.revenue, v.expense)),
  );

  const handleExportCSV = () => {
    const headers = ["Date", "Revenue", "Expense", "Net Cash Flow"];
    const rows = sortedDates.map((date) => {
      const { revenue, expense } = transactionsByDate[date];
      return [date, revenue, expense, revenue - expense];
    });
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cash-flow.csv";
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
          <h1 className="text-2xl md:text-3xl">Cash Flow</h1>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm hover:border-primary"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 mb-8">
        <h3 className="font-serif text-lg mb-6">Cash Flow Over Time</h3>
        <div className="space-y-4">
          {sortedDates.map((date) => {
            const { revenue, expense } = transactionsByDate[date];
            const netCashFlow = revenue - expense;
            const revenueHeight = maxValue > 0 ? (revenue / maxValue) * 100 : 0;
            const expenseHeight = maxValue > 0 ? (expense / maxValue) * 100 : 0;

            return (
              <div key={date} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{date}</span>
                  <span className={netCashFlow >= 0 ? "text-green-600" : "text-red-600"}>
                    Net: {formatPrice(netCashFlow)}
                  </span>
                </div>
                <div className="flex gap-4 h-24 items-end">
                  <div className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-green-500 rounded-t"
                      style={{ height: `${revenueHeight}%` }}
                    />
                    <span className="text-xs text-muted-foreground mt-1">Revenue</span>
                    <span className="text-xs font-semibold">{formatPrice(revenue)}</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-red-500 rounded-t"
                      style={{ height: `${expenseHeight}%` }}
                    />
                    <span className="text-xs text-muted-foreground mt-1">Expense</span>
                    <span className="text-xs font-semibold">{formatPrice(expense)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-600">
            {formatPrice(Object.values(transactionsByDate).reduce((sum, v) => sum + v.revenue, 0))}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">
            {formatPrice(Object.values(transactionsByDate).reduce((sum, v) => sum + v.expense, 0))}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Net Cash Flow</h3>
          <p className="text-2xl font-bold">
            {formatPrice(
              Object.values(transactionsByDate).reduce(
                (sum, v) => sum + (v.revenue - v.expense),
                0,
              ),
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
