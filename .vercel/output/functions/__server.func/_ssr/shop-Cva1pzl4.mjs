import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { I as Funnel, Y as ChevronDown, n as X } from "../_libs/lucide-react.mjs";
import { c as categories, l as concerns, n as ProductCard, p as products, r as Button, s as brands } from "./router-DsJhwsz_.mjs";
import { t as Section } from "./Section-DtbXHetF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-Cva1pzl4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductBrowser({ scope, showCategoryFilter = true }) {
	const [cats, setCats] = (0, import_react.useState)([]);
	const [brandSel, setBrandSel] = (0, import_react.useState)([]);
	const [concernSel, setConcernSel] = (0, import_react.useState)([]);
	const [maxPrice, setMaxPrice] = (0, import_react.useState)(70);
	const [sort, setSort] = (0, import_react.useState)("popularity");
	const [mobileFiltersOpen, setMobileFiltersOpen] = (0, import_react.useState)(false);
	const toggle = (list, v, set) => set(list.includes(v) ? list.filter((i) => i !== v) : [...list, v]);
	const results = (0, import_react.useMemo)(() => {
		let list = products.filter((p) => scope ? p.category === scope : true);
		if (cats.length) list = list.filter((p) => cats.includes(p.category));
		if (brandSel.length) list = list.filter((p) => brandSel.includes(p.brand));
		if (concernSel.length) list = list.filter((p) => p.concerns.some((c) => concernSel.includes(c)));
		list = list.filter((p) => p.price <= maxPrice);
		const sorted = [...list];
		sorted.sort((a, b) => {
			if (sort === "price-asc") return a.price - b.price;
			if (sort === "price-desc") return b.price - a.price;
			if (sort === "newest") return Number(!!b.isNew) - Number(!!a.isNew);
			return b.popularity - a.popularity;
		});
		return sorted;
	}, [
		scope,
		cats,
		brandSel,
		concernSel,
		maxPrice,
		sort
	]);
	const reset = () => {
		setCats([]);
		setBrandSel([]);
		setConcernSel([]);
		setMaxPrice(70);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setMobileFiltersOpen(true),
				className: "lg:hidden flex items-center gap-2 px-4 py-2 rounded-md border border-border hover:bg-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm",
					children: "Filters"
				})]
			}),
			mobileFiltersOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/50",
					onClick: () => setMobileFiltersOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute right-0 top-0 h-full w-full max-w-sm bg-background p-6 overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "label-caps",
								children: "Filters"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMobileFiltersOpen(false),
								className: "p-2 hover:bg-muted rounded-md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: reset,
								className: "text-xs text-muted-foreground underline underline-offset-4 hover:text-primary-deep",
								children: "Clear all"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileFilterContent, {
							cats,
							setCats,
							brandSel,
							setBrandSel,
							concernSel,
							setConcernSel,
							maxPrice,
							setMaxPrice,
							showCategoryFilter,
							toggle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full mt-6",
							onClick: () => setMobileFiltersOpen(false),
							children: "Apply Filters"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden lg:block h-fit lg:sticky lg:top-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-caps",
						children: "Filters"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: reset,
						className: "text-xs text-muted-foreground underline underline-offset-4 hover:text-primary-deep",
						children: "Clear"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileFilterContent, {
					cats,
					setCats,
					brandSel,
					setBrandSel,
					concernSel,
					setConcernSel,
					maxPrice,
					setMaxPrice,
					showCategoryFilter,
					toggle
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						results.length,
						" product",
						results.length === 1 ? "" : "s"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-caps text-muted-foreground",
						children: "Sort"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: sort,
						onChange: (e) => setSort(e.target.value),
						className: "h-10 rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "popularity",
								children: "Popularity"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "newest",
								children: "Newest"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "price-asc",
								children: "Price: low to high"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "price-desc",
								children: "Price: high to low"
							})
						]
					})]
				})]
			}), results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-dashed border-border py-24 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Nothing matches those filters yet."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "mt-5",
					onClick: reset,
					children: "Clear filters"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 xl:grid-cols-3",
				children: results.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			})] })
		]
	});
}
function FilterGroup({ title, children }) {
	const [isOpen, setIsOpen] = (0, import_react.useState)(true);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 border-t border-border pt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "flex w-full items-center justify-between font-serif text-base hover:text-primary-deep",
			onClick: () => setIsOpen(!isOpen),
			children: [title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}` })]
		}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex flex-col gap-3",
			children
		})]
	});
}
function Check$1({ label, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "checkbox",
			checked,
			onChange,
			className: "h-4 w-4 rounded-sm border-border accent-[var(--primary)]"
		}), label]
	});
}
function MobileFilterContent({ cats, setCats, brandSel, setBrandSel, concernSel, setConcernSel, maxPrice, setMaxPrice, showCategoryFilter, toggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			showCategoryFilter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
				title: "Category",
				children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check$1, {
					label: c.name,
					checked: cats.includes(c.slug),
					onChange: () => toggle(cats, c.slug, setCats)
				}, c.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
				title: "Brand",
				children: brands.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check$1, {
					label: b,
					checked: brandSel.includes(b),
					onChange: () => toggle(brandSel, b, setBrandSel)
				}, b))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterGroup, {
				title: "Price",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 20,
					max: 70,
					step: 2,
					value: maxPrice,
					onChange: (e) => setMaxPrice(Number(e.target.value)),
					className: "w-full accent-[var(--primary)]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: ["Up to ₵", maxPrice]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
				title: "Skin type / concern",
				children: concerns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check$1, {
					label: c,
					checked: concernSel.includes(c),
					onChange: () => toggle(concernSel, c, setConcernSel)
				}, c))
			})
		]
	});
}
function ShopAll() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-b border-border bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[88rem] px-5 py-14 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-caps text-gold",
					children: "Shop all"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-4xl md:text-5xl",
					children: "The full shelf"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground",
					children: "Sixteen products, four categories, zero filler. Filter your way to the one you’ll actually finish."
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		width: "wide",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductBrowser, {})
	})] });
}
//#endregion
export { ProductBrowser, ShopAll as component };
