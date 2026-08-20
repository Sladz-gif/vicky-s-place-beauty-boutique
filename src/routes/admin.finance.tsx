import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, TrendingUp, TrendingDown, Download } from "lucide-react";
import { mockFinanceTransactions } from "@/data/mock/finance";
import { formatPrice } from "@/data/api";
import { Modal } from "@/components/Modal";
import type { FinanceTransaction } from "@/data/types";
import { useState } from "react";

export const Route = createFileRoute("/admin/finance")({
  head: () => ({
    meta: [
      { title: "Finance — Admin Dashboard" },
      {
        name: "description",
        content: "Manage finances for Vicky's Place.",
      },
    ],
  }),
  component: AdminFinance,
});

function AdminFinance() {
  const [view, setView] = useState<
    "overview" | "transactions" | "accounts_payable" | "accounts_receivable"
  >("overview");
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    type: "revenue" as "revenue" | "expense",
    category: "",
    note: "",
    amount: "",
    relatedOrderId: "",
    dueDate: "",
    status: "pending" as "pending" | "paid" | "overdue",
  });

  const totalRevenue = mockFinanceTransactions
    .filter((t: FinanceTransaction) => t.type === "revenue")
    .reduce((sum: number, t: FinanceTransaction) => sum + t.amount, 0);

  const totalExpenses = mockFinanceTransactions
    .filter((t: FinanceTransaction) => t.type === "expense")
    .reduce((sum: number, t: FinanceTransaction) => sum + t.amount, 0);

  const netProfit = totalRevenue - totalExpenses;

  const accountsPayable = mockFinanceTransactions.filter(
    (t) => t.type === "expense" && t.category === "accounts_payable",
  );
  const accountsReceivable = mockFinanceTransactions.filter(
    (t) => t.type === "revenue" && t.category === "accounts_receivable",
  );
  const totalPayable = accountsPayable.reduce((sum, t) => sum + t.amount, 0);
  const totalReceivable = accountsReceivable.reduce((sum, t) => sum + t.amount, 0);

  const handleExportCSV = () => {
    const headers = ["Date", "Type", "Category", "Note", "Amount"];
    const rows = mockFinanceTransactions.map((t) => [
      t.date,
      t.type,
      t.category,
      t.note,
      t.type === "revenue" ? t.amount : -t.amount,
    ]);
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "finance-transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddTransaction = () => {
    setFormData({
      date: new Date().toISOString().split("T")[0],
      type: "revenue",
      category: "",
      note: "",
      amount: "",
      relatedOrderId: "",
      dueDate: "",
      status: "pending",
    });
    setShowAddModal(true);
  };

  const handleSaveTransaction = () => {
    console.log("Adding transaction:", formData);
    alert("Transaction added successfully!");
    setShowAddModal(false);
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            Admin
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <h1 className="text-2xl md:text-3xl">Finance</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm hover:border-primary"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
          <button
            onClick={handleAddTransaction}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
          >
            <Plus className="h-4 w-4" />
            Add Transaction
          </button>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2 rounded-md border border-border bg-card p-1 w-fit">
        <button
          onClick={() => setView("overview")}
          className={`px-4 py-2 rounded-md text-sm ${view === "overview" ? "bg-muted" : "hover:bg-muted/50"}`}
        >
          Overview
        </button>
        <button
          onClick={() => setView("transactions")}
          className={`px-4 py-2 rounded-md text-sm ${view === "transactions" ? "bg-muted" : "hover:bg-muted/50"}`}
        >
          Transactions
        </button>
        <button
          onClick={() => setView("accounts_payable")}
          className={`px-4 py-2 rounded-md text-sm ${view === "accounts_payable" ? "bg-muted" : "hover:bg-muted/50"}`}
        >
          Accounts Payable
        </button>
        <button
          onClick={() => setView("accounts_receivable")}
          className={`px-4 py-2 rounded-md text-sm ${view === "accounts_receivable" ? "bg-muted" : "hover:bg-muted/50"}`}
        >
          Accounts Receivable
        </button>
      </div>

      {view === "overview" ? (
        <>
          <div className="grid gap-6 sm:grid-cols-3 mb-8">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-xs font-semibold text-green-600">Revenue</span>
              </div>
              <p className="mt-4 text-2xl font-semibold">{formatPrice(totalRevenue)}</p>
              <p className="mt-1 text-sm text-muted-foreground">Total Revenue</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <TrendingDown className="h-5 w-5 text-red-600" />
                <span className="text-xs font-semibold text-red-600">Expenses</span>
              </div>
              <p className="mt-4 text-2xl font-semibold">{formatPrice(totalExpenses)}</p>
              <p className="mt-1 text-sm text-muted-foreground">Total Expenses</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                <span
                  className={`text-xs font-semibold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {netProfit >= 0 ? "Profit" : "Loss"}
                </span>
              </div>
              <p className="mt-4 text-2xl font-semibold">{formatPrice(netProfit)}</p>
              <p className="mt-1 text-sm text-muted-foreground">Net Profit/Loss</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 mb-8">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Accounts Payable</h3>
                <span className="text-xs font-semibold text-red-600">Outstanding</span>
              </div>
              <p className="text-2xl font-semibold text-red-600">{formatPrice(totalPayable)}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {accountsPayable.length} pending payments
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Accounts Receivable</h3>
                <span className="text-xs font-semibold text-green-600">Outstanding</span>
              </div>
              <p className="text-2xl font-semibold text-green-600">
                {formatPrice(totalReceivable)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {accountsReceivable.length} pending receipts
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card">
            <div className="border-b border-border px-6 py-4">
              <h3 className="font-serif text-lg">Transaction History</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Note</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {mockFinanceTransactions.map((transaction: FinanceTransaction) => (
                  <tr key={transaction.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm">{transaction.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          transaction.type === "revenue"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{transaction.category}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{transaction.note}</td>
                    <td className="px-6 py-4 text-right font-semibold">
                      {transaction.type === "revenue" ? "+" : "-"}
                      {formatPrice(transaction.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : view === "accounts_payable" ? (
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border px-6 py-4">
            <h3 className="font-serif text-lg">Accounts Payable</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Due Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Note</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {accountsPayable.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No accounts payable entries
                  </td>
                </tr>
              ) : (
                accountsPayable.map((transaction: FinanceTransaction) => (
                  <tr key={transaction.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm">{transaction.date}</td>
                    <td className="px-6 py-4 text-sm">-</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{transaction.note}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-600">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-red-600">
                      {formatPrice(transaction.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : view === "accounts_receivable" ? (
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border px-6 py-4">
            <h3 className="font-serif text-lg">Accounts Receivable</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Due Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Note</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {accountsReceivable.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No accounts receivable entries
                  </td>
                </tr>
              ) : (
                accountsReceivable.map((transaction: FinanceTransaction) => (
                  <tr key={transaction.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm">{transaction.date}</td>
                    <td className="px-6 py-4 text-sm">-</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{transaction.note}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-600">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-green-600">
                      {formatPrice(transaction.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border px-6 py-4">
            <h3 className="font-serif text-lg">All Transactions</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Note</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {mockFinanceTransactions.map((transaction: FinanceTransaction) => (
                <tr key={transaction.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-4 text-sm">{transaction.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        transaction.type === "revenue"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{transaction.category}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{transaction.note}</td>
                  <td className="px-6 py-4 text-right font-semibold">
                    {transaction.type === "revenue" ? "+" : "-"}
                    {formatPrice(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Transaction"
        footer={
          <>
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveTransaction}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep"
            >
              Add Transaction
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value as "revenue" | "expense" })
              }
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            >
              <option value="revenue">Revenue</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="e.g., Sales, Rent, Inventory"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Amount (₵)</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Note</label>
            <textarea
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              rows={3}
              className="w-full rounded-md border border-border bg-card p-4 text-sm outline-none focus:border-primary resize-y"
              placeholder="Optional notes"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
