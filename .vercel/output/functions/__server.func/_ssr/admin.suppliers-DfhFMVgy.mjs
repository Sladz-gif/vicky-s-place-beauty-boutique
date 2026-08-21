import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Phone, D as MapPin, O as Mail, S as Plus, W as Clock, c as Trash2, f as SquarePen } from "../_libs/lucide-react.mjs";
import { t as Modal } from "./Modal-fwR_rBs9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.suppliers-DfhFMVgy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var mockSuppliers = [
	{
		id: "SUP-001",
		name: "Ghana Beauty Supplies Ltd",
		contactPerson: "Kwame Mensah",
		email: "kwame@ghanabeauty.com",
		phone: "+233 20 123 4567",
		address: "Accra Industrial Area, Ghana",
		paymentTerms: "Net 30",
		leadTime: 7,
		active: true,
		createdAt: "2024-01-15"
	},
	{
		id: "SUP-002",
		name: "West African Cosmetics",
		contactPerson: "Ama Asante",
		email: "ama@wacosmetics.com",
		phone: "+233 24 234 5678",
		address: "Kumasi, Ghana",
		paymentTerms: "Net 15",
		leadTime: 5,
		active: true,
		createdAt: "2024-02-20"
	},
	{
		id: "SUP-003",
		name: "Global Hair Products",
		contactPerson: "John Doe",
		email: "john@globalhair.com",
		phone: "+233 50 345 6789",
		address: "Tema, Ghana",
		paymentTerms: "COD",
		leadTime: 3,
		active: false,
		createdAt: "2024-03-10"
	}
];
function AdminSuppliers() {
	const [showAddModal, setShowAddModal] = (0, import_react.useState)(false);
	const [showEditModal, setShowEditModal] = (0, import_react.useState)(false);
	const [editingSupplier, setEditingSupplier] = (0, import_react.useState)(null);
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		contactPerson: "",
		email: "",
		phone: "",
		address: "",
		paymentTerms: "",
		leadTime: ""
	});
	const handleAddSupplier = () => {
		setFormData({
			name: "",
			contactPerson: "",
			email: "",
			phone: "",
			address: "",
			paymentTerms: "",
			leadTime: ""
		});
		setShowAddModal(true);
	};
	const handleEditSupplier = (supplierId) => {
		const supplier = mockSuppliers.find((s) => s.id === supplierId);
		if (supplier) {
			setEditingSupplier(supplier);
			setFormData({
				name: supplier.name,
				contactPerson: supplier.contactPerson,
				email: supplier.email,
				phone: supplier.phone,
				address: supplier.address,
				paymentTerms: supplier.paymentTerms,
				leadTime: supplier.leadTime.toString()
			});
			setShowEditModal(true);
		}
	};
	const handleDeleteSupplier = (supplierId) => {
		if (confirm("Are you sure you want to delete this supplier?")) console.log("Deleting supplier:", supplierId);
	};
	const handleSaveSupplier = () => {
		if (showAddModal) {
			console.log("Adding supplier:", formData);
			alert("Supplier added successfully!");
			setShowAddModal(false);
		} else if (showEditModal && editingSupplier) {
			console.log("Updating supplier:", editingSupplier.id, formData);
			alert("Supplier updated successfully!");
			setShowEditModal(false);
			setEditingSupplier(null);
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
						children: "Suppliers"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleAddSupplier,
					className: "flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Add Supplier"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg border border-border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3",
					children: mockSuppliers.map((supplier) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-6 hover:border-primary transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-lg",
									children: supplier.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: supplier.id
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleEditSupplier(supplier.id),
									className: "p-2 hover:bg-muted rounded-md",
									title: "Edit",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleDeleteSupplier(supplier.id),
									className: "p-2 hover:bg-muted rounded-md text-red-600",
									title: "Delete",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: supplier.phone })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: supplier.email })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-muted-foreground mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: supplier.address })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Lead time: ",
										supplier.leadTime,
										" days"
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between pt-3 border-t border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm text-muted-foreground",
										children: ["Payment: ", supplier.paymentTerms]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-full px-3 py-1 text-xs font-semibold ${supplier.active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`,
										children: supplier.active ? "Active" : "Inactive"
									})]
								})
							]
						})]
					}, supplier.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				isOpen: showAddModal,
				onClose: () => setShowAddModal(false),
				title: "Add New Supplier",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setShowAddModal(false),
					className: "px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleSaveSupplier,
					className: "px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep",
					children: "Add Supplier"
				})] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Company Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: formData.name,
							onChange: (e) => setFormData({
								...formData,
								name: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
							placeholder: "Enter company name"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Contact Person"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: formData.contactPerson,
							onChange: (e) => setFormData({
								...formData,
								contactPerson: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
							placeholder: "Enter contact name"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							value: formData.email,
							onChange: (e) => setFormData({
								...formData,
								email: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
							placeholder: "Enter email address"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Phone"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "tel",
							value: formData.phone,
							onChange: (e) => setFormData({
								...formData,
								phone: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
							placeholder: "Enter phone number"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Address"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: formData.address,
							onChange: (e) => setFormData({
								...formData,
								address: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
							placeholder: "Enter address"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Payment Terms"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: formData.paymentTerms,
							onChange: (e) => setFormData({
								...formData,
								paymentTerms: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
							placeholder: "e.g., Net 30, COD"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Lead Time (days)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: formData.leadTime,
							onChange: (e) => setFormData({
								...formData,
								leadTime: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
							placeholder: "Enter lead time in days"
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				isOpen: showEditModal,
				onClose: () => {
					setShowEditModal(false);
					setEditingSupplier(null);
				},
				title: "Edit Supplier",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setShowEditModal(false);
						setEditingSupplier(null);
					},
					className: "px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleSaveSupplier,
					className: "px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep",
					children: "Save Changes"
				})] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Company Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: formData.name,
							onChange: (e) => setFormData({
								...formData,
								name: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Contact Person"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: formData.contactPerson,
							onChange: (e) => setFormData({
								...formData,
								contactPerson: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							value: formData.email,
							onChange: (e) => setFormData({
								...formData,
								email: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Phone"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "tel",
							value: formData.phone,
							onChange: (e) => setFormData({
								...formData,
								phone: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Address"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: formData.address,
							onChange: (e) => setFormData({
								...formData,
								address: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Payment Terms"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: formData.paymentTerms,
							onChange: (e) => setFormData({
								...formData,
								paymentTerms: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Lead Time (days)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: formData.leadTime,
							onChange: (e) => setFormData({
								...formData,
								leadTime: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
						})] })
					]
				})
			})
		]
	});
}
//#endregion
export { AdminSuppliers as component };
