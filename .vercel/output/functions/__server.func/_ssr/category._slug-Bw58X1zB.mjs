import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { p as products } from "./router-DsJhwsz_.mjs";
import { r as ProductBrowser, s as Route$12 } from "./router-DsJhwsz_2.mjs";
import { t as Section } from "./Section-DtbXHetF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category._slug-Bw58X1zB.js
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const { category } = Route$12.useLoaderData();
	const count = products.filter((p) => p.category === category.slug).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-[88rem] items-center gap-0 md:grid-cols-[1.1fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 py-16 sm:px-8 md:py-24 lg:pl-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "label-caps text-gold",
						children: [count, " products"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-5 text-4xl md:text-5xl",
						children: category.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-rule my-6" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-md text-[0.98rem] leading-relaxed text-muted-foreground",
						children: category.blurb
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-64 md:h-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: category.image,
					alt: category.name,
					width: 900,
					height: 900,
					className: "h-full w-full object-cover"
				})
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		width: "wide",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductBrowser, {
			scope: category.slug,
			showCategoryFilter: false
		})
	})] });
}
//#endregion
export { CategoryPage as component };
