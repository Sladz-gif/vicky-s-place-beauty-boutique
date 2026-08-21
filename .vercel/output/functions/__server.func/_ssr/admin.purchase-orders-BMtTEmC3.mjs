import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as CircleX, K as CircleCheckBig, S as Plus, W as Clock, c as Trash2, f as SquarePen, w as Package } from "../_libs/lucide-react.mjs";
import { t as Modal } from "./Modal-fwR_rBs9.mjs";
import { _ as formatPrice } from "./router-DsJhwsz_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.purchase-orders-BMtTEmC3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var mockPurchaseOrders = [{
	id: "PO-001",
	supplierId: "SUP-001",
	supplierName: "Ghana Beauty Supplies Ltd",
	status: "ordered",
	items: [{
		productId: "PROD-001",
		productName: "Shea Butter Body Lotion",
		variantId: "VAR-001",
		variantLabel: "500ml",
		qty: 50,
		costPrice: 15,
		total: 750
	}],
	subtotal: 750,
	tax: 75,
	total: 825,
	orderDate: "2024-08-15",
	expectedDeliveryDate: "2024-08-22",
	notes: "Urgent order",
	createdBy: "Admin",
	createdAt: "2024-08-15"
}, {
	id: "PO-002",
	supplierId: "SUP-002",
	supplierName: "West African Cosmetics",
	status: "received",
	items: [{
		productId: "PROD-002",
		productName: "Natural Hair Shampoo",
		variantId: "VAR-002",
		variantLabel: "250ml",
		qty: 100,
		costPrice: 12,
		total: 1200
	}],
	subtotal: 1200,
	tax: 120,
	total: 1320,
	orderDate: "2024-08-10",
	expectedDeliveryDate: "2024-08-15",
	receivedDate: "2024-08-15",
	createdBy: "Admin",
	createdAt: "2024-08-10"
}];
function AdminPurchaseOrders() {
	const [showAddModal, setShowAddModal] = (0, import_react.useState)(false);
	const [showEditModal, setShowEditModal] = (0, import_react.useState)(false);
	const [editingOrder, setEditingOrder] = (0, import_react.useState)(null);
	const [formData, setFormData] = (0, import_react.useState)({
		supplierId: "",
		supplierName: "",
		expectedDeliveryDate: "",
		notes: ""
	});
	const [orderItems, setOrderItems] = (0, import_react.useState)([]);
	const handleAddOrder = () => {
		setFormData({
			supplierId: "",
			supplierName: "",
			expectedDeliveryDate: "",
			notes: ""
		});
		setOrderItems([]);
		setShowAddModal(true);
	};
	const handleEditOrder = (orderId) => {
		const order = mockPurchaseOrders.find((o) => o.id === orderId);
		if (order) {
			setEditingOrder(order);
			setFormData({
				supplierId: order.supplierId,
				supplierName: order.supplierName,
				expectedDeliveryDate: order.expectedDeliveryDate,
				notes: order.notes || ""
			});
			setOrderItems(order.items);
			setShowEditModal(true);
		}
	};
	const handleDeleteOrder = (orderId) => {
		if (confirm("Are you sure you want to delete this purchase order?")) console.log("Deleting purchase order:", orderId);
	};
	const handleSaveOrder = () => {
		const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
		const tax = subtotal * .1;
		const total = subtotal + tax;
		if (showAddModal) {
			console.log("Adding purchase order:", {
				...formData,
				items: orderItems,
				subtotal,
				tax,
				total
			});
			alert("Purchase order created successfully!");
			setShowAddModal(false);
		} else if (showEditModal && editingOrder) {
			console.log("Updating purchase order:", editingOrder.id, {
				...formData,
				items: orderItems,
				subtotal,
				tax,
				total
			});
			alert("Purchase order updated successfully!");
			setShowEditModal(false);
			setEditingOrder(null);
		}
	};
	const addOrderItem = () => {
		setOrderItems([...orderItems, {
			productId: "",
			productName: "",
			variantId: "",
			variantLabel: "",
			qty: 1,
			costPrice: 0,
			total: 0
		}]);
	};
	const updateOrderItem = (index, field, value) => {
		const updatedItems = [...orderItems];
		updatedItems[index] = {
			...updatedItems[index],
			[field]: value
		};
		if (field === "qty" || field === "costPrice") updatedItems[index].total = updatedItems[index].qty * updatedItems[index].costPrice;
		setOrderItems(updatedItems);
	};
	const removeOrderItem = (index) => {
		setOrderItems(orderItems.filter((_, i) => i !== index));
	};
	const getStatusColor = (status) => {
		switch (status) {
			case "draft": return "bg-gray-100 text-gray-600";
			case "ordered": return "bg-blue-100 text-blue-600";
			case "received": return "bg-green-100 text-green-600";
			case "cancelled": return "bg-red-100 text-red-600";
			default: return "bg-gray-100 text-gray-600";
		}
	};
	const getStatusIcon = (status) => {
		switch (status) {
			case "draft": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" });
			case "ordered": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" });
			case "received": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4 w-4" });
			case "cancelled": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" });
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" });
		}
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
						children: "Purchase Orders"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleAddOrder,
					className: "flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "New Purchase Order"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg border border-border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "PO Number"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Supplier"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Order Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Expected Delivery"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-right text-sm font-semibold",
								children: "Total"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-right text-sm font-semibold",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: mockPurchaseOrders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border hover:bg-muted/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 font-semibold",
								children: order.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4",
								children: order.supplierName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(order.status)}`,
									children: [getStatusIcon(order.status), order.status.charAt(0).toUpperCase() + order.status.slice(1)]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 text-sm",
								children: order.orderDate
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 text-sm",
								children: order.expectedDeliveryDate
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 text-right font-semibold",
								children: formatPrice(order.total)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-end gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleEditOrder(order.id),
										className: "p-2 hover:bg-muted rounded-md",
										title: "Edit",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleDeleteOrder(order.id),
										className: "p-2 hover:bg-muted rounded-md text-red-600",
										title: "Delete",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								})
							})
						]
					}, order.id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				isOpen: showAddModal,
				onClose: () => setShowAddModal(false),
				title: "New Purchase Order",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setShowAddModal(false),
					className: "px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleSaveOrder,
					className: "px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep",
					children: "Create Order"
				})] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Supplier"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: formData.supplierId,
							onChange: (e) => setFormData({
								...formData,
								supplierId: e.target.value,
								supplierName: e.target.options[e.target.selectedIndex].text
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select supplier"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "SUP-001",
									children: "Ghana Beauty Supplies Ltd"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "SUP-002",
									children: "West African Cosmetics"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "SUP-003",
									children: "Global Hair Products"
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Expected Delivery Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: formData.expectedDeliveryDate,
							onChange: (e) => setFormData({
								...formData,
								expectedDeliveryDate: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
						})] }),
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
							className: "w-full rounded-md border border-border bg-card p-4 text-sm outline-none focus:border-primary resize-y",
							placeholder: "Optional notes"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-sm font-semibold",
								children: "Order Items"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: addOrderItem,
								className: "text-sm text-primary hover:underline",
								children: "+ Add Item"
							})]
						}), orderItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center py-4 text-muted-foreground text-sm",
							children: "No items added yet"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: orderItems.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 items-start p-3 bg-muted/30 rounded-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: item.productName,
											onChange: (e) => updateOrderItem(index, "productName", e.target.value),
											placeholder: "Product name",
											className: "h-8 w-full rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: item.variantLabel,
											onChange: (e) => updateOrderItem(index, "variantLabel", e.target.value),
											placeholder: "Variant (optional)",
											className: "h-8 w-full rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													value: item.qty,
													onChange: (e) => updateOrderItem(index, "qty", parseInt(e.target.value) || 0),
													placeholder: "Qty",
													className: "h-8 w-20 rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													value: item.costPrice,
													onChange: (e) => updateOrderItem(index, "costPrice", parseFloat(e.target.value) || 0),
													placeholder: "Cost",
													className: "h-8 w-24 rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex items-center text-sm font-semibold",
													children: formatPrice(item.total)
												})
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => removeOrderItem(index),
									className: "p-1 hover:bg-muted rounded-md text-red-600 mt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})]
							}, index))
						})] }),
						orderItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border pt-4 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Subtotal"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(orderItems.reduce((sum, item) => sum + item.total, 0)) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Tax (10%)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(orderItems.reduce((sum, item) => sum + item.total, 0) * .1) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(orderItems.reduce((sum, item) => sum + item.total, 0) * 1.1) })]
								})
							]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { AdminPurchaseOrders as component };
