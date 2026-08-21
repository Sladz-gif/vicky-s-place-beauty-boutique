import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Phone, D as MapPin, O as Mail, S as Plus, tt as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as mockOrders } from "./orders-DBjSgANs.mjs";
import { _ as formatPrice } from "./router-DsJhwsz_.mjs";
import { a as Route$10 } from "./router-DsJhwsz_2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.customers._id-6wOhaymB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var mockCustomers = [
	{
		id: "cust-1",
		name: "Ama Mensah",
		email: "ama.mensah@email.com",
		phone: "+233 24 123 4567",
		addresses: [{
			id: "addr-1-1",
			label: "Home",
			region: "Greater Accra",
			city: "Accra",
			digitalGpsAddress: "AK-039-5028",
			landmark: "Near Makola Market",
			isDefault: true
		}, {
			id: "addr-1-2",
			label: "Work",
			region: "Greater Accra",
			city: "Accra",
			digitalGpsAddress: "AK-087-1234",
			landmark: "Airport Residential Area",
			isDefault: false
		}],
		createdAt: "2024-01-10T00:00:00Z"
	},
	{
		id: "cust-2",
		name: "Kwame Asante",
		email: "kwame.asante@email.com",
		phone: "+233 20 987 6543",
		addresses: [{
			id: "addr-2-1",
			label: "Home",
			region: "Ashanti",
			city: "Kumasi",
			digitalGpsAddress: "AS-456-7890",
			landmark: "Near Kejetia Market",
			isDefault: true
		}],
		createdAt: "2024-02-15T00:00:00Z"
	},
	{
		id: "cust-3",
		name: "Efua Ofori",
		email: "efua.ofori@email.com",
		phone: "+233 55 456 7890",
		addresses: [{
			id: "addr-3-1",
			label: "Home",
			region: "Greater Accra",
			city: "Tema",
			digitalGpsAddress: "TE-234-5678",
			landmark: "Community 25",
			isDefault: true
		}],
		createdAt: "2024-03-01T00:00:00Z"
	},
	{
		id: "cust-4",
		name: "Kojo Mensah",
		email: "kojo.mensah@email.com",
		phone: "+233 50 345 6789",
		addresses: [{
			id: "addr-4-1",
			label: "Home",
			region: "Eastern",
			city: "Koforidua",
			digitalGpsAddress: "EA-123-4567",
			landmark: "Near Jackson Park",
			isDefault: true
		}],
		createdAt: "2024-03-10T00:00:00Z"
	}
];
function AdminCustomerDetail() {
	const { id } = Route$10.useParams();
	const [newNote, setNewNote] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)(["First purchase - great customer!", "Asked about product availability"]);
	const customer = mockCustomers.find((c) => c.id === id);
	if (!customer) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold",
				children: "Customer not found"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/customers",
				className: "text-primary hover:underline mt-4 inline-block",
				children: "Back to customers"
			})]
		})
	});
	const customerOrders = mockOrders.filter((o) => o.customerId === id);
	const lifetimeValue = customerOrders.reduce((sum, order) => sum + order.total, 0);
	const handleAddNote = () => {
		if (newNote.trim()) {
			setNotes([...notes, newNote]);
			setNewNote("");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4 lg:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-4 mb-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin/customers",
				className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "Back to customers"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-lg mb-6",
							children: "Customer Information"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-6 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-semibold text-primary",
									children: customer.name.split(" ").map((n) => n[0]).join("")
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl font-semibold",
										children: customer.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: customer.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted-foreground",
										children: ["Joined ", customer.createdAt.split("T")[0]]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: customer.email
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Phone"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: customer.phone
									})] })]
								}),
								customer.addresses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5 text-muted-foreground mt-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: "Addresses"
										}), customer.addresses.map((address) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 rounded-lg bg-muted/30 p-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-semibold",
													children: address.label
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-sm",
													children: [
														address.region,
														", ",
														address.city
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm",
													children: address.digitalGpsAddress
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm",
													children: address.landmark
												})
											]
										}, address.id))]
									})]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-serif text-lg mb-6",
						children: "Purchase History"
					}), customerOrders.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: customerOrders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-4 border-b border-border last:border-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: order.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: order.placedAt.split("T")[0]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground",
									children: [order.items.length, " items"]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: formatPrice(order.total)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-full px-3 py-1 text-xs font-semibold capitalize ${order.status === "delivered" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`,
									children: order.status
								})]
							})]
						}, order.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "No orders yet"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-serif text-lg mb-4",
						children: "Customer Stats"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Total Orders"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-bold",
								children: customerOrders.length
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Lifetime Value"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-bold",
								children: formatPrice(lifetimeValue)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Average Order Value"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-bold",
								children: customerOrders.length > 0 ? formatPrice(lifetimeValue / customerOrders.length) : formatPrice(0)
							})] })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-lg mb-4",
							children: "Notes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3 mb-4",
							children: notes.map((note, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-lg bg-muted/30 p-3 text-sm",
								children: note
							}, index))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: newNote,
								onChange: (e) => setNewNote(e.target.value),
								placeholder: "Add a note...",
								className: "flex-1 h-10 rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleAddNote,
								className: "flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
							})]
						})
					]
				})]
			})]
		})]
	});
}
//#endregion
export { AdminCustomerDetail as component };
