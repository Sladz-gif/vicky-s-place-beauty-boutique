import { createFileRoute, Link } from "@tanstack/react-router";
import {
  DollarSign,
  CreditCard,
  Smartphone,
  Printer,
  CheckCircle,
  AlertTriangle,
  Calendar,
  User,
} from "lucide-react";
import { Modal } from "@/components/Modal";
import { formatPrice } from "@/data/api";
import type { CashReconciliation } from "@/data/types";
import { useState } from "react";

const mockReconciliations: CashReconciliation[] = [
  {
    id: "REC-001",
    date: new Date().toISOString().split("T")[0],
    staffId: "STAFF-001",
    staffName: "Sarah Johnson",
    openingBalance: 500,
    cashSales: 1250,
    cardSales: 850,
    mobileMoneySales: 1200,
    totalSales: 3300,
    cashIn: 200,
    cashOut: 150,
    expectedCash: 1800,
    actualCash: 1795,
    variance: -5,
    notes: "Small variance due to rounding",
    reconciledBy: "Admin",
    reconciledAt: new Date().toISOString(),
  },
  {
    id: "REC-002",
    date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
    staffId: "STAFF-002",
    staffName: "Kwame Mensah",
    openingBalance: 300,
    cashSales: 980,
    cardSales: 620,
    mobileMoneySales: 890,
    totalSales: 2490,
    cashIn: 100,
    cashOut: 80,
    expectedCash: 1300,
    actualCash: 1300,
    variance: 0,
    notes: "Balanced",
    reconciledBy: "Admin",
    reconciledAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const Route = createFileRoute("/admin/reconciliation")({
  head: () => ({
    meta: [
      { title: "Cash Reconciliation — Admin Dashboard" },
      {
        name: "description",
        content: "Daily sales reconciliation and cash management for Vicky's Place.",
      },
    ],
  }),
  component: AdminReconciliation,
});

function AdminReconciliation() {
  const [showReconcileModal, setShowReconcileModal] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    staffId: "",
    staffName: "",
    openingBalance: "",
    cashSales: "",
    cardSales: "",
    mobileMoneySales: "",
    cashIn: "",
    cashOut: "",
    actualCash: "",
    notes: "",
  });

  const handleReconcile = () => {
    const cashSales = parseFloat(formData.cashSales) || 0;
    const cashIn = parseFloat(formData.cashIn) || 0;
    const cashOut = parseFloat(formData.cashOut) || 0;
    const openingBalance = parseFloat(formData.openingBalance) || 0;
    const expectedCash = openingBalance + cashSales + cashIn - cashOut;
    const actualCash = parseFloat(formData.actualCash) || 0;
    const variance = actualCash - expectedCash;

    console.log("Reconciliation:", {
      ...formData,
      expectedCash,
      actualCash,
      variance,
    });
    alert(`Reconciliation saved. Variance: ${formatPrice(variance)}`);
    setShowReconcileModal(false);
  };

  const calculateExpected = () => {
    const cashSales = parseFloat(formData.cashSales) || 0;
    const cashIn = parseFloat(formData.cashIn) || 0;
    const cashOut = parseFloat(formData.cashOut) || 0;
    const openingBalance = parseFloat(formData.openingBalance) || 0;
    return openingBalance + cashSales + cashIn - cashOut;
  };

  const calculateVariance = () => {
    const actualCash = parseFloat(formData.actualCash) || 0;
    return actualCash - calculateExpected();
  };

  const handlePrintReceipt = (reconciliation: CashReconciliation) => {
    console.log("Printing receipt for:", reconciliation.id);
    alert("Receipt printed successfully!");
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            Admin
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <h1 className="text-2xl md:text-3xl">Cash Reconciliation</h1>
        </div>
        <button
          onClick={() => setShowReconcileModal(true)}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
        >
          <DollarSign className="h-4 w-4" />
          New Reconciliation
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span className="text-xs font-semibold text-green-600">Today's Sales</span>
          </div>
          <p className="mt-4 text-2xl font-semibold">
            {formatPrice(mockReconciliations[0]?.totalSales || 0)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Total revenue</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <CreditCard className="h-5 w-5 text-blue-600" />
            <span className="text-xs font-semibold text-blue-600">Card Sales</span>
          </div>
          <p className="mt-4 text-2xl font-semibold">
            {formatPrice(mockReconciliations[0]?.cardSales || 0)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Card payments</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <Smartphone className="h-5 w-5 text-purple-600" />
            <span className="text-xs font-semibold text-purple-600">Mobile Money</span>
          </div>
          <p className="mt-4 text-2xl font-semibold">
            {formatPrice(mockReconciliations[0]?.mobileMoneySales || 0)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">MoMo payments</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold text-primary">Cash on Hand</span>
          </div>
          <p className="mt-4 text-2xl font-semibold">
            {formatPrice(mockReconciliations[0]?.actualCash || 0)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Physical cash</p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h3 className="font-serif text-lg">Reconciliation History</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Staff</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">Total Sales</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">Expected Cash</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">Actual Cash</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">Variance</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockReconciliations.map((reconciliation: CashReconciliation) => (
              <tr key={reconciliation.id} className="border-b border-border hover:bg-muted/50">
                <td className="px-6 py-4 text-sm">{reconciliation.date}</td>
                <td className="px-6 py-4 font-semibold">{reconciliation.staffName}</td>
                <td className="px-6 py-4 text-right font-semibold">
                  {formatPrice(reconciliation.totalSales)}
                </td>
                <td className="px-6 py-4 text-right">{formatPrice(reconciliation.expectedCash)}</td>
                <td className="px-6 py-4 text-right">{formatPrice(reconciliation.actualCash)}</td>
                <td
                  className={`px-6 py-4 text-right font-semibold ${reconciliation.variance === 0 ? "text-green-600" : reconciliation.variance < 0 ? "text-red-600" : "text-yellow-600"}`}
                >
                  {formatPrice(Math.abs(reconciliation.variance))}
                  {reconciliation.variance < 0 && " -"}
                </td>
                <td className="px-6 py-4 text-center">
                  {reconciliation.variance === 0 ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mx-auto" />
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handlePrintReceipt(reconciliation)}
                    className="p-2 hover:bg-muted rounded-md"
                    title="Print Receipt"
                  >
                    <Printer className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={showReconcileModal}
        onClose={() => setShowReconcileModal(false)}
        title="Daily Cash Reconciliation"
        footer={
          <>
            <button
              onClick={() => setShowReconcileModal(false)}
              className="px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleReconcile}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep"
            >
              Save Reconciliation
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
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
              <label className="block text-sm font-semibold mb-2">Staff</label>
              <input
                type="text"
                value={formData.staffName}
                onChange={(e) => setFormData({ ...formData, staffName: e.target.value })}
                className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                placeholder="Enter staff name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Opening Balance</label>
            <input
              type="number"
              value={formData.openingBalance}
              onChange={(e) => setFormData({ ...formData, openingBalance: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="₵0.00"
            />
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="font-semibold mb-3">Sales by Payment Method</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold mb-2">Cash Sales</label>
                <input
                  type="number"
                  value={formData.cashSales}
                  onChange={(e) => setFormData({ ...formData, cashSales: e.target.value })}
                  className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                  placeholder="₵0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Card Sales</label>
                <input
                  type="number"
                  value={formData.cardSales}
                  onChange={(e) => setFormData({ ...formData, cardSales: e.target.value })}
                  className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                  placeholder="₵0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Mobile Money Sales</label>
                <input
                  type="number"
                  value={formData.mobileMoneySales}
                  onChange={(e) => setFormData({ ...formData, mobileMoneySales: e.target.value })}
                  className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                  placeholder="₵0.00"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold mb-2">Cash In (deposits)</label>
              <input
                type="number"
                value={formData.cashIn}
                onChange={(e) => setFormData({ ...formData, cashIn: e.target.value })}
                className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                placeholder="₵0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Cash Out (withdrawals)</label>
              <input
                type="number"
                value={formData.cashOut}
                onChange={(e) => setFormData({ ...formData, cashOut: e.target.value })}
                className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                placeholder="₵0.00"
              />
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Expected Cash</p>
                <p className="text-xl font-semibold">{formatPrice(calculateExpected())}</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <label className="block text-sm font-semibold mb-2">Actual Cash Count</label>
                <input
                  type="number"
                  value={formData.actualCash}
                  onChange={(e) => setFormData({ ...formData, actualCash: e.target.value })}
                  className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                  placeholder="₵0.00"
                />
              </div>
              <div
                className={`p-4 rounded-lg ${calculateVariance() === 0 ? "bg-green-100" : calculateVariance() < 0 ? "bg-red-100" : "bg-yellow-100"}`}
              >
                <p className="text-sm text-muted-foreground">Variance</p>
                <p
                  className={`text-xl font-semibold ${calculateVariance() === 0 ? "text-green-600" : calculateVariance() < 0 ? "text-red-600" : "text-yellow-600"}`}
                >
                  {formatPrice(Math.abs(calculateVariance()))}
                  {calculateVariance() < 0 && " -"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={2}
              className="w-full rounded-md border border-border bg-card p-4 text-sm outline-none focus:border-resize-y"
              placeholder="Add notes about variance or any issues"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
