import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { f as Outlet, l as useLocation, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Menu, J as ChevronLeft, L as FileText, M as LayoutDashboard, V as DollarSign, Z as Calendar, h as ShoppingCart, k as LogOut, n as X, o as TrendingUp, p as SquareCheckBig, q as ChevronRight, r as Users, u as Star, w as Package } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DTpb8EHU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var navItems = [
	{
		label: "Dashboard",
		to: "/admin",
		icon: LayoutDashboard
	},
	{
		label: "POS",
		to: "/admin/pos",
		icon: ShoppingCart
	},
	{
		label: "Products",
		to: "/admin/products",
		icon: Package
	},
	{
		label: "Categories",
		to: "/admin/categories",
		icon: Package
	},
	{
		label: "Orders",
		to: "/admin/orders",
		icon: ShoppingCart
	},
	{
		label: "Customers",
		to: "/admin/customers",
		icon: Users
	},
	{
		label: "Finance",
		to: "/admin/finance",
		icon: TrendingUp
	},
	{
		label: "Suppliers",
		to: "/admin/suppliers",
		icon: Users
	},
	{
		label: "Purchase Orders",
		to: "/admin/purchase-orders",
		icon: Package
	},
	{
		label: "Reports",
		to: "/admin/reports",
		icon: TrendingUp
	},
	{
		label: "Loyalty",
		to: "/admin/loyalty",
		icon: Star
	},
	{
		label: "Reconciliation",
		to: "/admin/reconciliation",
		icon: DollarSign
	},
	{
		label: "Tasks",
		to: "/admin/ops/tasks",
		icon: SquareCheckBig
	},
	{
		label: "Calendar",
		to: "/admin/ops/calendar",
		icon: Calendar
	},
	{
		label: "Staff",
		to: "/admin/ops/staff",
		icon: Users
	},
	{
		label: "Activity",
		to: "/admin/ops/activity",
		icon: FileText
	},
	{
		label: "Content",
		to: "/admin/ops/content",
		icon: FileText
	}
];
function AdminLayout({ children }) {
	const location = useLocation();
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const [sidebarCollapsed, setSidebarCollapsed] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col lg:flex-row",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:hidden flex items-center justify-between border-b border-border bg-background px-4 py-3 sticky top-0 z-40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-gold",
					children: "Vicky's Place Admin"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setSidebarOpen(!sidebarOpen),
					className: "p-2 hover:bg-muted rounded-md",
					"aria-label": "Toggle menu",
					children: sidebarOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
				})]
			}),
			sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/50",
					onClick: () => setSidebarOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-background border-r border-border shadow-lg overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-serif text-xl text-gold",
							children: "Vicky's Place"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-1",
							children: "Admin Console"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSidebarContent, {
						location,
						closeSidebar: () => setSidebarOpen(false),
						collapsed: false
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `hidden lg:block border-r border-border bg-background h-screen fixed top-0 left-0 flex-shrink-0 transition-all duration-300 z-30 ${sidebarCollapsed ? "w-16" : "w-64"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 flex items-center justify-between flex-shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: `font-serif text-gold ${sidebarCollapsed ? "text-lg" : "text-xl"}`,
							children: sidebarCollapsed ? "VP" : "Vicky's Place"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSidebarCollapsed(!sidebarCollapsed),
							className: "p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground",
							"aria-label": "Toggle sidebar",
							children: sidebarCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
						})]
					}),
					!sidebarCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-1 px-6 flex-shrink-0",
						children: "Admin Console"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col h-[calc(100vh-80px)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSidebarContent, {
							location,
							collapsed: sidebarCollapsed,
							onExpand: () => setSidebarCollapsed(false)
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `flex-1 overflow-auto lg:ml-0 ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"}`,
				children
			})
		]
	});
}
function AdminSidebarContent({ location, closeSidebar, collapsed, onExpand }) {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "px-4 py-2 flex flex-col h-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1 flex-1 overflow-y-auto py-2",
				children: navItems.map((item) => {
					const Icon = item.icon;
					const isActive = item.to === "/admin" ? location.pathname === "/admin" : location.pathname === item.to || location.pathname.startsWith(item.to + "/");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							router.navigate({ to: item.to });
							closeSidebar?.();
						},
						className: `w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-left ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"} ${collapsed ? "justify-center" : ""}`,
						title: collapsed ? item.label : void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `${collapsed ? "h-5 w-5" : "h-4 w-4"}` }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
					}) }, item.to);
				})
			}),
			collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 pt-6 border-t border-border flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onExpand,
					className: "p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground",
					"aria-label": "Expand sidebar",
					title: "Expand sidebar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-6 w-6" })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 pt-6 border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => router.navigate({ to: "/" }),
					className: `w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left ${collapsed ? "justify-center" : ""}`,
					title: collapsed ? "Exit Admin" : void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: `${collapsed ? "h-5 w-5" : "h-4 w-4"}` }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Exit Admin" })]
				})
			})
		]
	});
}
function AdminDashboard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { AdminDashboard as component };
