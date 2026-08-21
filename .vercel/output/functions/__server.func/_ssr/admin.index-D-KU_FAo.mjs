import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { et as ArrowRight, h as ShoppingCart, o as TrendingUp, r as Users, w as Package } from "../_libs/lucide-react.mjs";
import { g as formatDateTime, x as mockActivityLog } from "./router-DsJhwsz_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-D-KU_FAo.js
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4 lg:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-6 lg:mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl lg:text-2xl md:text-3xl",
					children: "Dashboard"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
					children: ["Back to store", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardCard, {
						title: "Total Revenue",
						value: "₵45,230",
						change: "+12.5%",
						icon: TrendingUp,
						positive: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardCard, {
						title: "Total Orders",
						value: "234",
						change: "+8.2%",
						icon: ShoppingCart,
						positive: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardCard, {
						title: "Products",
						value: "16",
						change: "Active",
						icon: Package
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardCard, {
						title: "Customers",
						value: "89",
						change: "+15",
						icon: Users,
						positive: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 lg:mt-12 grid gap-6 lg:gap-8 lg:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						title: "Recent Orders",
						link: "/admin/orders",
						linkText: "View all orders",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: [
								{
									id: "ORD-001",
									customer: "Ama Mensah",
									total: "₵120",
									status: "Pending"
								},
								{
									id: "ORD-002",
									customer: "Kofi Asante",
									total: "₵85",
									status: "Shipped"
								},
								{
									id: "ORD-003",
									customer: "Abena Osei",
									total: "₵210",
									status: "Delivered"
								},
								{
									id: "ORD-004",
									customer: "Kwame Boateng",
									total: "₵45",
									status: "Pending"
								}
							].map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-lg border border-border bg-card p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: order.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: order.customer
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: order.total
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: order.status
									})]
								})]
							}, order.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						title: "Low Stock Alerts",
						link: "/admin/products",
						linkText: "Manage products",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: [
								{
									name: "Glow Serum",
									stock: 3,
									threshold: 5
								},
								{
									name: "Hydrating Mist",
									stock: 2,
									threshold: 5
								},
								{
									name: "Night Cream",
									stock: 4,
									threshold: 5
								}
							].map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-lg border border-border bg-card p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: product.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground",
									children: [
										product.stock,
										" left (threshold: ",
										product.threshold,
										")"
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600",
									children: "Low Stock"
								})]
							}, product.name))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						title: "Recent Activity",
						link: "/admin/ops/activity",
						linkText: "View all activity",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: mockActivityLog.slice(0, 5).map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-start gap-3 rounded-lg border border-border bg-card p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: entry.staffName
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-muted-foreground",
												children: [
													" ",
													entry.action,
													" "
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: entry.entityName
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground mt-1",
										children: formatDateTime(entry.timestamp)
									})]
								})
							}, entry.id))
						})
					})
				]
			})
		]
	});
}
function DashboardCard({ title, value, change, icon: Icon, positive }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-card p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `text-xs font-semibold ${positive ? "text-green-600" : "text-muted-foreground"}`,
					children: change
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-2xl font-semibold",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: title
			})
		]
	});
}
function SectionCard({ title, link, linkText, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-card p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-serif text-lg",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: link,
				className: "text-sm text-primary hover:underline",
				children: [linkText, " →"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children
		})]
	});
}
//#endregion
export { AdminDashboard as component };
