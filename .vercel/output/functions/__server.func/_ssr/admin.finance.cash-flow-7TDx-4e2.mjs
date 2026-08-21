import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Download } from "../_libs/lucide-react.mjs";
import { _ as formatPrice } from "./router-DsJhwsz_.mjs";
import { t as mockFinanceTransactions } from "./finance-Cci0hDfi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.finance.cash-flow-7TDx-4e2.js
var import_jsx_runtime = require_jsx_runtime();
function AdminCashFlow() {
	const transactionsByDate = mockFinanceTransactions.reduce((acc, t) => {
		if (!acc[t.date]) acc[t.date] = {
			revenue: 0,
			expense: 0
		};
		if (t.type === "revenue") acc[t.date].revenue += t.amount;
		else acc[t.date].expense += t.amount;
		return acc;
	}, {});
	const sortedDates = Object.keys(transactionsByDate).sort();
	const maxValue = Math.max(...Object.values(transactionsByDate).map((v) => Math.max(v.revenue, v.expense)));
	const handleExportCSV = () => {
		const csvContent = [[
			"Date",
			"Revenue",
			"Expense",
			"Net Cash Flow"
		], ...sortedDates.map((date) => {
			const { revenue, expense } = transactionsByDate[date];
			return [
				date,
				revenue,
				expense,
				revenue - expense
			];
		})].map((row) => row.join(",")).join("\n");
		const blob = new Blob([csvContent], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "cash-flow.csv";
		a.click();
		URL.revokeObjectURL(url);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4 lg:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin",
						className: "text-sm text-muted-foreground hover:text-foreground",
						children: "Admin"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-2 text-muted-foreground",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/finance",
						className: "text-sm text-muted-foreground hover:text-foreground",
						children: "Finance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-2 text-muted-foreground",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl md:text-3xl",
						children: "Cash Flow"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleExportCSV,
					className: "flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm hover:border-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), "Export CSV"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-card p-6 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-serif text-lg mb-6",
					children: "Cash Flow Over Time"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: sortedDates.map((date) => {
						const { revenue, expense } = transactionsByDate[date];
						const netCashFlow = revenue - expense;
						const revenueHeight = maxValue > 0 ? revenue / maxValue * 100 : 0;
						const expenseHeight = maxValue > 0 ? expense / maxValue * 100 : 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: date
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: netCashFlow >= 0 ? "text-green-600" : "text-red-600",
									children: ["Net: ", formatPrice(netCashFlow)]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 h-24 items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 flex flex-col items-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-full bg-green-500 rounded-t",
											style: { height: `${revenueHeight}%` }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground mt-1",
											children: "Revenue"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold",
											children: formatPrice(revenue)
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 flex flex-col items-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-full bg-red-500 rounded-t",
											style: { height: `${expenseHeight}%` }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground mt-1",
											children: "Expense"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold",
											children: formatPrice(expense)
										})
									]
								})]
							})]
						}, date);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold text-muted-foreground mb-2",
							children: "Total Revenue"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-bold text-green-600",
							children: formatPrice(Object.values(transactionsByDate).reduce((sum, v) => sum + v.revenue, 0))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold text-muted-foreground mb-2",
							children: "Total Expenses"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-bold text-red-600",
							children: formatPrice(Object.values(transactionsByDate).reduce((sum, v) => sum + v.expense, 0))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold text-muted-foreground mb-2",
							children: "Net Cash Flow"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-bold",
							children: formatPrice(Object.values(transactionsByDate).reduce((sum, v) => sum + (v.revenue - v.expense), 0))
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { AdminCashFlow as component };
