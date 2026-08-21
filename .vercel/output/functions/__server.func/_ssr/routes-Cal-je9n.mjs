import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as categories, n as ProductCard, p as products, r as Button } from "./router-DsJhwsz_.mjs";
import { n as SectionHeading, t as Section } from "./Section-DtbXHetF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cal-je9n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const bestsellers = products.filter((p) => p.bestseller).slice(0, 4);
	const [email, setEmail] = (0, import_react.useState)("");
	const [subscribed, setSubscribed] = (0, import_react.useState)(false);
	const handleNewsletterSubmit = (e) => {
		e.preventDefault();
		if (email && email.includes("@")) {
			console.log("Newsletter signup:", email);
			setSubscribed(true);
			setEmail("");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-[88rem] items-stretch gap-0 md:grid-cols-[1fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-center px-5 py-16 sm:px-8 md:py-28 lg:pl-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "label-caps text-gold",
							children: "Est. 2019 · Small batch beauty"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-6 text-[2.6rem] leading-[1.05] md:text-6xl",
							children: [
								"Your glow,",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"gently practised."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-md text-[1.02rem] leading-relaxed text-muted-foreground",
							children: "Skin-loving formulas and soft-focus colour, chosen one by one for the shelf we’d keep at home. No noise, no ten-step promises."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-9 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/shop",
									children: "Shop the edit"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "gold",
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/category/$slug",
									params: { slug: "skincare" },
									children: "Skincare"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-12 flex items-center gap-8",
							children: [
								["4.8★", "2,400+ reviews"],
								["Clean", "Never tested on animals"],
								["48h", "Local delivery"]
							].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-lg",
								children: k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: v
							})] }, k))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative min-h-[26rem] bg-blush",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/hero.jpg",
						alt: "Model holding a Vicky's Place foundation bottle",
						width: 1200,
						height: 1504,
						className: "h-full w-full object-cover"
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			width: "wide",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				label: "Shop by category",
				title: "Four shelves, carefully kept",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					className: "label-caps text-gold underline-offset-8 hover:underline",
					children: "Shop all"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
				children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/category/$slug",
					params: { slug: c.slug },
					className: "group overflow-hidden rounded-lg bg-card shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-square overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.image,
							alt: c.name,
							loading: "lazy",
							width: 900,
							height: 900,
							className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg",
							children: c.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs leading-relaxed text-muted-foreground",
							children: c.blurb
						})]
					})]
				}, c.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			width: "wide",
			className: "pt-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				label: "Bestsellers",
				title: "What keeps selling out",
				description: "The five products our regulars re-buy without thinking twice."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: bestsellers.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center md:py-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-caps text-gold",
						children: "About Vicky’s Place"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 text-3xl leading-tight md:text-[2.4rem]",
						children: "It started as a shelf in Vicky’s living room."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-rule my-7" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.98rem] leading-relaxed text-muted-foreground",
						children: "Friends kept borrowing her serums, so she started ordering doubles. Seven years later the shelf is a boutique, and the rule is unchanged: nothing goes on it unless she uses it herself."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-[0.98rem] leading-relaxed text-muted-foreground",
						children: "Every formula is patch-tested by our team, decanted into recyclable glass and packed by hand with a note."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							children: "Read our story"
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-4",
					children: categories.slice(0, 4).map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: c.image,
						alt: c.name,
						loading: "lazy",
						width: 900,
						height: 900,
						className: `w-full rounded-lg object-cover ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-square"}`
					}, c.slug))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-blush",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl px-5 py-20 text-center sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-caps text-espresso/70",
						children: "The Sunday Note"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-3xl md:text-[2.3rem]",
						children: "Ten percent off, and no spam."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground",
						children: "One email a week: new arrivals, restocks and the routines we’re testing."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row",
						onSubmit: handleNewsletterSubmit,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							required: true,
							value: email,
							onChange: (e) => setEmail(e.target.value),
							placeholder: "you@email.com",
							className: "h-12 flex-1 rounded-md border border-border bg-card px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "dark",
							className: "h-12",
							children: "Sign up"
						})]
					}),
					subscribed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-green-600",
						children: "Thanks for subscribing! Check your inbox."
					})
				]
			})
		})
	] });
}
//#endregion
export { Home as component };
