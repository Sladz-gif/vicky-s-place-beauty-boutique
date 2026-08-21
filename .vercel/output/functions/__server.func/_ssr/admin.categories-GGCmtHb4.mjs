import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as GripVertical, S as Plus, c as Trash2, f as SquarePen } from "../_libs/lucide-react.mjs";
import { t as Modal } from "./Modal-fwR_rBs9.mjs";
import { c as categories } from "./router-DsJhwsz_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.categories-GGCmtHb4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminCategories() {
	const [showAddModal, setShowAddModal] = (0, import_react.useState)(false);
	const [showEditModal, setShowEditModal] = (0, import_react.useState)(false);
	const [editingCategory, setEditingCategory] = (0, import_react.useState)(null);
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		slug: "",
		image: ""
	});
	const handleAddCategory = () => {
		setFormData({
			name: "",
			slug: "",
			image: ""
		});
		setShowAddModal(true);
	};
	const handleEditCategory = (categorySlug) => {
		const category = categories.find((c) => c.slug === categorySlug);
		if (category) {
			setEditingCategory(category);
			setFormData({
				name: category.name,
				slug: category.slug,
				image: category.image
			});
			setShowEditModal(true);
		}
	};
	const handleDeleteCategory = (categorySlug) => {
		if (confirm("Are you sure you want to delete this category?")) console.log("Deleting category:", categorySlug);
	};
	const handleSaveCategory = () => {
		if (showAddModal) {
			console.log("Adding category:", formData);
			alert("Category added successfully!");
			setShowAddModal(false);
		} else if (showEditModal && editingCategory) {
			console.log("Updating category:", editingCategory.slug, formData);
			alert("Category updated successfully!");
			setShowEditModal(false);
			setEditingCategory(null);
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
						children: "Categories"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleAddCategory,
					className: "flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Add Category"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: categories.map((category, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 rounded-lg border border-border bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "h-5 w-5 text-muted-foreground cursor-move" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: category.image,
							alt: category.name,
							className: "h-16 w-16 rounded-md object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: category.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: category.slug
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleEditCategory(category.slug),
								className: "p-2 hover:bg-muted rounded-md",
								title: "Edit",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleDeleteCategory(category.slug),
								className: "p-2 hover:bg-muted rounded-md text-red-600",
								title: "Delete",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})]
						})
					]
				}, category.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				isOpen: showAddModal,
				onClose: () => setShowAddModal(false),
				title: "Add New Category",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setShowAddModal(false),
					className: "px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleSaveCategory,
					className: "px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep",
					children: "Add Category"
				})] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Category Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: formData.name,
							onChange: (e) => setFormData({
								...formData,
								name: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
							placeholder: "Enter category name"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Slug"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: formData.slug,
							onChange: (e) => setFormData({
								...formData,
								slug: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
							placeholder: "category-slug"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Image URL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: formData.image,
							onChange: (e) => setFormData({
								...formData,
								image: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
							placeholder: "https://example.com/image.jpg"
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				isOpen: showEditModal,
				onClose: () => {
					setShowEditModal(false);
					setEditingCategory(null);
				},
				title: "Edit Category",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setShowEditModal(false);
						setEditingCategory(null);
					},
					className: "px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleSaveCategory,
					className: "px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep",
					children: "Save Changes"
				})] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Category Name"
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
							children: "Slug"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: formData.slug,
							onChange: (e) => setFormData({
								...formData,
								slug: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Image URL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: formData.image,
							onChange: (e) => setFormData({
								...formData,
								image: e.target.value
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
export { AdminCategories as component };
