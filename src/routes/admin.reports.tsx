import { createFileRoute, Link } from "@tanstack/react-router";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  Calendar,
  Download,
} from "lucide-react";
import { formatPrice } from "@/data/api";
import { useState } from "react";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Admin Dashboard" },
      {
        name: "description",
        content: "Sales reports and analytics for Vicky's Place.",
      },
    ],
  }),
  component: AdminReports,
});

function AdminReports() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly" | "yearly">("monthly");
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);

  // Mock data - in production this would come from the database
  const reportData = {
    totalRevenue: 45600,
    totalCost: 28500,
    grossProfit: 17100,
    profitMargin: 37.5,
    totalOrders: 234,
    averageOrderValue: 195,
    topSellingProducts: [
      { productId: "PROD-001", productName: "Shea Butter Body Lotion", qty: 45, revenue: 6750 },
      { productId: "PROD-002", productName: "Natural Hair Shampoo", qty: 38, revenue: 4560 },
      { productId: "PROD-003", productName: "Coconut Oil Hair Mask", qty: 32, revenue: 4800 },
      { productId: "PROD-004", productName: "Aloe Vera Face Cream", qty: 28, revenue: 4200 },
      { productId: "PROD-005", productName: "Argan Oil Serum", qty: 25, revenue: 5000 },
    ],
    salesByPaymentMethod: [
      { method: "MTN MoMo", amount: 18240, percentage: 40 },
      { method: "Vodafone Cash", amount: 9120, percentage: 20 },
      { method: "Card", amount: 6840, percentage: 15 },
      { method: "Cash", amount: 9120, percentage: 20 },
      { method: "POS", amount: 2280, percentage: 5 },
    ],
    salesByCategory: [
      { category: "Hair Care", amount: 15600, percentage: 34.2 },
      { category: "Skin Care", amount: 13680, percentage: 30 },
      { category: "Body Care", amount: 9120, percentage: 20 },
      { category: "Fragrances", amount: 4560, percentage: 10 },
      { category: "Accessories", amount: 2640, percentage: 5.8 },
    ],
    salesByChannel: [
      { channel: "Online", amount: 27360, percentage: 60 },
      { channel: "In-Store", amount: 18240, percentage: 40 },
    ],
  };

  const handleExportReport = () => {
    console.log("Exporting report for period:", period, startDate, endDate);
    alert("Report exported successfully!");
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            Admin
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <h1 className="text-2xl md:text-3xl">Reports & Analytics</h1>
        </div>
        <button
          onClick={handleExportReport}
          className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm hover:border-primary"
        >
          <Download className="h-4 w-4" />
          Export Report
        </button>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold">Period:</span>
        </div>
        <div className="flex gap-2">
          {(["daily", "weekly", "monthly", "yearly"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-md text-sm capitalize ${period === p ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="h-9 rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary"
          />
          <span className="text-muted-foreground">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="h-9 rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span className="text-xs font-semibold text-green-600">Revenue</span>
          </div>
          <p className="mt-4 text-2xl font-semibold">{formatPrice(reportData.totalRevenue)}</p>
          <p className="mt-1 text-sm text-muted-foreground">Total Revenue</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <TrendingDown className="h-5 w-5 text-red-600" />
            <span className="text-xs font-semibold text-red-600">Cost</span>
          </div>
          <p className="mt-4 text-2xl font-semibold">{formatPrice(reportData.totalCost)}</p>
          <p className="mt-1 text-sm text-muted-foreground">Total Cost</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold text-primary">Profit</span>
          </div>
          <p className="mt-4 text-2xl font-semibold">{formatPrice(reportData.grossProfit)}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {reportData.profitMargin.toFixed(1)}% margin
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground">Orders</span>
          </div>
          <p className="mt-4 text-2xl font-semibold">{reportData.totalOrders}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatPrice(reportData.averageOrderValue)} avg
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-serif text-lg mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {reportData.topSellingProducts.map((product, index) => (
              <div
                key={product.productId}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-sm">{product.productName}</p>
                    <p className="text-xs text-muted-foreground">{product.qty} units sold</p>
                  </div>
                </div>
                <p className="font-semibold">{formatPrice(product.revenue)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-serif text-lg mb-4">Sales by Payment Method</h3>
          <div className="space-y-3">
            {reportData.salesByPaymentMethod.map((item) => (
              <div key={item.method} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{item.method}</span>
                  <span className="text-muted-foreground">{formatPrice(item.amount)}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-right">{item.percentage}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-serif text-lg mb-4">Sales by Category</h3>
          <div className="space-y-3">
            {reportData.salesByCategory.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{item.category}</span>
                  <span className="text-muted-foreground">{formatPrice(item.amount)}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-right">
                  {item.percentage.toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-serif text-lg mb-4">Sales by Channel</h3>
          <div className="space-y-3">
            {reportData.salesByChannel.map((item) => (
              <div key={item.channel} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{item.channel}</span>
                  <span className="text-muted-foreground">{formatPrice(item.amount)}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full transition-all ${item.channel === "Online" ? "bg-primary" : "bg-green-600"}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-right">{item.percentage}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-serif text-lg mb-4">Key Performance Indicators</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Inventory Turnover</span>
            </div>
            <p className="text-2xl font-semibold">4.2x</p>
            <p className="text-xs text-muted-foreground">per month</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Customer Retention</span>
            </div>
            <p className="text-2xl font-semibold">78%</p>
            <p className="text-xs text-muted-foreground">returning customers</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Avg Order Value</span>
            </div>
            <p className="text-2xl font-semibold">{formatPrice(reportData.averageOrderValue)}</p>
            <p className="text-xs text-muted-foreground">per transaction</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Growth Rate</span>
            </div>
            <p className="text-2xl font-semibold text-green-600">+12.5%</p>
            <p className="text-xs text-muted-foreground">vs last period</p>
          </div>
        </div>
      </div>
    </div>
  );
}
