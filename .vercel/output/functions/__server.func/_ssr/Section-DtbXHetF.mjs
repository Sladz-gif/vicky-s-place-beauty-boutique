import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as cn } from "./router-DsJhwsz_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Section-DtbXHetF.js
var import_jsx_runtime = require_jsx_runtime();
function Section({ children, className, width = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("px-5 py-16 sm:px-8 md:py-24", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("mx-auto w-full", width === "default" && "max-w-6xl", width === "wide" && "max-w-[88rem]", width === "narrow" && "max-w-3xl"),
			children
		})
	});
}
function SectionHeading({ label, title, description, align = "left", action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("mb-10 flex flex-col gap-4 md:mb-14", align === "center" && "items-center text-center", action && "md:flex-row md:items-end md:justify-between"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("max-w-xl", align === "center" && "max-w-2xl"),
			children: [
				label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-caps mb-3 text-gold",
					children: label
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl leading-tight md:text-[2.6rem]",
					children: title
				}),
				description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-[0.95rem] leading-relaxed text-muted-foreground",
					children: description
				}) : null
			]
		}), action]
	});
}
//#endregion
export { SectionHeading as n, Section as t };
