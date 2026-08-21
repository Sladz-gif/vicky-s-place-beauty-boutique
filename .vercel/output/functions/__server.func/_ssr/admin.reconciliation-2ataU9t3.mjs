import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { K as CircleCheckBig, U as CreditCard, V as DollarSign, a as TriangleAlert, m as Smartphone, x as Printer } from "../_libs/lucide-react.mjs";
import { t as Modal } from "./Modal-fwR_rBs9.mjs";
import { _ as formatPrice } from "./router-DsJhwsz_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.reconciliation-2ataU9t3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var mockReconciliations = [{
	id: "REC-001",
	date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
	staffId: "STAFF-001",
	staffName: "Sarah Johnson",
	openingBalance: 500,
	cashSales: 1250,
	cardSales: 850,
	mobileMoneySales: 1200,
	posSales: 450,
	totalSales: 3750,
	cashIn: 200,
	cashOut: 150,
	expectedCash: 1800,
	actualCash: 1795,
	variance: -5,
	notes: "Small variance due to rounding",
	reconciledBy: "Admin",
	reconciledAt: (/* @__PURE__ */ new Date()).toISOString()
}, {
	id: "REC-002",
	date: (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString().split("T")[0],
	staffId: "STAFF-002",
	staffName: "Kwame Mensah",
	openingBalance: 300,
	cashSales: 980,
	cardSales: 620,
	mobileMoneySales: 890,
	posSales: 320,
	totalSales: 2810,
	cashIn: 100,
	cashOut: 80,
	expectedCash: 1300,
	actualCash: 1300,
	variance: 0,
	notes: "Balanced",
	reconciledBy: "Admin",
	reconciledAt: (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString()
}];
function AdminReconciliation() {
	const [showReconcileModal, setShowReconcileModal] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
		staffId: "",
		staffName: "",
		openingBalance: "",
		cashSales: "",
		cardSales: "",
		mobileMoneySales: "",
		posSales: "",
		cashIn: "",
		cashOut: "",
		actualCash: "",
		notes: ""
	});
	const handleReconcile = () => {
		const cashSales = parseFloat(formData.cashSales) || 0;
		const cashIn = parseFloat(formData.cashIn) || 0;
		const cashOut = parseFloat(formData.cashOut) || 0;
		const expectedCash = (parseFloat(formData.openingBalance) || 0) + cashSales + cashIn - cashOut;
		const actualCash = parseFloat(formData.actualCash) || 0;
		const variance = actualCash - expectedCash;
		console.log("Reconciliation:", {
			...formData,
			expectedCash,
			actualCash,
			variance
		});
		alert(`Reconciliation saved. Variance: ${formatPrice(variance)}`);
		setShowReconcileModal(false);
	};
	const calculateExpected = () => {
		const cashSales = parseFloat(formData.cashSales) || 0;
		const cashIn = parseFloat(formData.cashIn) || 0;
		const cashOut = parseFloat(formData.cashOut) || 0;
		return (parseFloat(formData.openingBalance) || 0) + cashSales + cashIn - cashOut;
	};
	const calculateVariance = () => {
		return (parseFloat(formData.actualCash) || 0) - calculateExpected();
	};
	const handlePrintReceipt = (reconciliation) => {
		console.log("Printing receipt for:", reconciliation.id);
		alert("Receipt printed successfully!");
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl md:text-3xl",
						children: "Cash Reconciliation"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowReconcileModal(true),
					className: "flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-4 w-4" }), "New Reconciliation"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-5 w-5 text-green-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-green-600",
									children: "Today's Sales"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-2xl font-semibold",
								children: formatPrice(mockReconciliations[0]?.totalSales || 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Total revenue"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-5 w-5 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-blue-600",
									children: "Card Sales"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-2xl font-semibold",
								children: formatPrice(mockReconciliations[0]?.cardSales || 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Card payments"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-5 w-5 text-purple-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-purple-600",
									children: "Mobile Money"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-2xl font-semibold",
								children: formatPrice(mockReconciliations[0]?.mobileMoneySales || 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "MoMo payments"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-primary",
									children: "Cash on Hand"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-2xl font-semibold",
								children: formatPrice(mockReconciliations[0]?.actualCash || 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Physical cash"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-border px-6 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-serif text-lg",
						children: "Reconciliation History"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Staff"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-right text-sm font-semibold",
								children: "Total Sales"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-right text-sm font-semibold",
								children: "Expected Cash"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-right text-sm font-semibold",
								children: "Actual Cash"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-right text-sm font-semibold",
								children: "Variance"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-center text-sm font-semibold",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-right text-sm font-semibold",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: mockReconciliations.map((reconciliation) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border hover:bg-muted/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 text-sm",
								children: reconciliation.date
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 font-semibold",
								children: reconciliation.staffName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 text-right font-semibold",
								children: formatPrice(reconciliation.totalSales)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 text-right",
								children: formatPrice(reconciliation.expectedCash)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 text-right",
								children: formatPrice(reconciliation.actualCash)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: `px-6 py-4 text-right font-semibold ${reconciliation.variance === 0 ? "text-green-600" : reconciliation.variance < 0 ? "text-red-600" : "text-yellow-600"}`,
								children: [formatPrice(Math.abs(reconciliation.variance)), reconciliation.variance < 0 && " -"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 text-center",
								children: reconciliation.variance === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-5 w-5 text-green-600 mx-auto" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5 text-yellow-600 mx-auto" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handlePrintReceipt(reconciliation),
									className: "p-2 hover:bg-muted rounded-md",
									title: "Print Receipt",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" })
								})
							})
						]
					}, reconciliation.id)) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				isOpen: showReconcileModal,
				onClose: () => setShowReconcileModal(false),
				title: "Daily Cash Reconciliation",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setShowReconcileModal(false),
					className: "px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleReconcile,
					className: "px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep",
					children: "Save Reconciliation"
				})] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-sm font-semibold mb-2",
								children: "Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: formData.date,
								onChange: (e) => setFormData({
									...formData,
									date: e.target.value
								}),
								className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-sm font-semibold mb-2",
								children: "Staff"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: formData.staffName,
								onChange: (e) => setFormData({
									...formData,
									staffName: e.target.value
								}),
								className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
								placeholder: "Enter staff name"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Opening Balance"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: formData.openingBalance,
							onChange: (e) => setFormData({
								...formData,
								openingBalance: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
							placeholder: "₵0.00"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-semibold mb-3",
								children: "Sales by Payment Method"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-sm font-semibold mb-2",
										children: "Cash Sales"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: formData.cashSales,
										onChange: (e) => setFormData({
											...formData,
											cashSales: e.target.value
										}),
										className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
										placeholder: "₵0.00"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-sm font-semibold mb-2",
										children: "Card Sales"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: formData.cardSales,
										onChange: (e) => setFormData({
											...formData,
											cardSales: e.target.value
										}),
										className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
										placeholder: "₵0.00"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-sm font-semibold mb-2",
										children: "Mobile Money Sales"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: formData.mobileMoneySales,
										onChange: (e) => setFormData({
											...formData,
											mobileMoneySales: e.target.value
										}),
										className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
										placeholder: "₵0.00"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-sm font-semibold mb-2",
										children: "POS Sales"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: formData.posSales,
										onChange: (e) => setFormData({
											...formData,
											posSales: e.target.value
										}),
										className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
										placeholder: "₵0.00"
									})] })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-sm font-semibold mb-2",
								children: "Cash In (deposits)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: formData.cashIn,
								onChange: (e) => setFormData({
									...formData,
									cashIn: e.target.value
								}),
								className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
								placeholder: "₵0.00"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-sm font-semibold mb-2",
								children: "Cash Out (withdrawals)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: formData.cashOut,
								onChange: (e) => setFormData({
									...formData,
									cashOut: e.target.value
								}),
								className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
								placeholder: "₵0.00"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-t border-border pt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 bg-muted/30 rounded-lg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: "Expected Cash"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xl font-semibold",
											children: formatPrice(calculateExpected())
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 bg-muted/30 rounded-lg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-sm font-semibold mb-2",
											children: "Actual Cash Count"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											value: formData.actualCash,
											onChange: (e) => setFormData({
												...formData,
												actualCash: e.target.value
											}),
											className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
											placeholder: "₵0.00"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `p-4 rounded-lg ${calculateVariance() === 0 ? "bg-green-100" : calculateVariance() < 0 ? "bg-red-100" : "bg-yellow-100"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: "Variance"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: `text-xl font-semibold ${calculateVariance() === 0 ? "text-green-600" : calculateVariance() < 0 ? "text-red-600" : "text-yellow-600"}`,
											children: [formatPrice(Math.abs(calculateVariance())), calculateVariance() < 0 && " -"]
										})]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: formData.notes,
							onChange: (e) => setFormData({
								...formData,
								notes: e.target.value
							}),
							rows: 2,
							className: "w-full rounded-md border border-border bg-card p-4 text-sm outline-none focus:border-resize-y",
							placeholder: "Add notes about variance or any issues"
						})] })
					]
				})
			})
		]
	});
}
//#endregion
export { AdminReconciliation as component };
