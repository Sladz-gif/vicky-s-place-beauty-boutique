import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { M as notFound, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useLocation, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { $ as ArrowUp, E as Menu, I as Funnel, N as Instagram, R as Facebook, S as Plus, T as Minus, Y as ChevronDown, _ as Settings, g as ShoppingBag, i as User, n as X, t as Youtube, v as Search } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { a as CartProvider, c as categories, d as getCategory, f as getProduct, h as calculateDiscount, i as cn, l as concerns, m as calculateDeliveryFee, n as ProductCard, o as useCart, p as products, r as Button, s as brands, u as formatPrice } from "./router-DsJhwsz_.mjs";
import { n as __exportAll } from "./server-B_litiwX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DsJhwsz_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-ycQOPoJt.css";
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
function SearchModal({ open, onOpenChange }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const results = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-2xl w-full mx-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Search products" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Search by name, brand, or description...",
						value: query,
						onChange: (e) => setQuery(e.target.value),
						className: "pl-10",
						autoFocus: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-[60vh] overflow-y-auto",
					children: query === "" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-sm text-muted-foreground py-8",
						children: "Start typing to search products"
					}) : results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center text-sm text-muted-foreground py-8",
						children: [
							"No products found for \"",
							query,
							"\""
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: results.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/product/$id",
							params: { id: p.id },
							className: "flex gap-4 rounded-lg border border-border p-4 hover:border-primary transition-colors",
							onClick: () => onOpenChange(false),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p.image,
								alt: p.name,
								className: "h-20 w-20 rounded-md object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "label-caps text-muted-foreground",
										children: p.brand
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm font-semibold",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-serif text-sm text-gold",
										children: formatPrice(p.price)
									})
								]
							})]
						}, p.id))
					})
				})
			]
		})
	});
}
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
function AccountModal({ open, onOpenChange }) {
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");
		if (!email || !password) {
			setError("Please fill in all fields");
			return;
		}
		if (!email.includes("@")) {
			setError("Please enter a valid email address");
			return;
		}
		console.log("Login attempt:", { email });
		onOpenChange(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-md w-full mx-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Sign in to your account" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Enter your email and password to access your account" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-4",
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							type: "email",
							placeholder: "you@example.com",
							value: email,
							onChange: (e) => setEmail(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "password",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "password",
							type: "password",
							placeholder: "••••••••",
							value: password,
							onChange: (e) => setPassword(e.target.value)
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-red-600",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						children: "Sign in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center text-sm text-muted-foreground",
						children: [
							"Don't have an account?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-primary hover:underline",
								onClick: () => onOpenChange(false),
								children: "Sign up"
							})
						]
					})
				]
			})]
		})
	});
}
function Navbar() {
	const { count, setDrawerOpen } = useCart();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [accountOpen, setAccountOpen] = (0, import_react.useState)(false);
	const navLinkClass = "label-caps text-muted-foreground transition-colors hover:text-primary-deep";
	const nav = (onClick) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/shop",
			className: navLinkClass,
			onClick,
			activeProps: { className: "text-espresso" },
			children: "Shop All"
		}),
		categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/category/$slug",
			params: { slug: c.slug },
			className: navLinkClass,
			onClick,
			activeProps: { className: "text-espresso" },
			children: c.name
		}, c.slug)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/about",
			className: navLinkClass,
			onClick,
			activeProps: { className: "text-espresso" },
			children: "About"
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label-caps bg-espresso py-2.5 text-center text-background/90",
				children: "Free delivery on orders over ₵100"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-[88rem] items-center justify-between gap-6 px-5 py-4 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "md:hidden",
						"aria-label": "Open menu",
						onClick: () => setOpen((v) => !v),
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-serif text-xl tracking-tight md:text-2xl",
							children: "Vicky’s Place"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center gap-8 md:flex",
						children: nav()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Search",
								className: "hover:text-primary-deep",
								onClick: () => setSearchOpen(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-[1.15rem] w-[1.15rem]" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								"aria-label": "Admin",
								className: "hidden hover:text-primary-deep sm:block",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-[1.15rem] w-[1.15rem]" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Account",
								className: "hidden hover:text-primary-deep sm:block",
								onClick: () => setAccountOpen(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-[1.15rem] w-[1.15rem]" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-label": "Open cart",
								onClick: () => setDrawerOpen(true),
								className: "relative hover:text-primary-deep",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-[1.15rem] w-[1.15rem]" }), count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[0.625rem] font-bold text-primary-foreground",
									children: count
								}) : null]
							})
						]
					})
				]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-col gap-3 border-t border-border px-5 py-5 md:hidden",
				children: nav(() => setOpen(false))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchModal, {
				open: searchOpen,
				onOpenChange: setSearchOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountModal, {
				open: accountOpen,
				onOpenChange: setAccountOpen
			})
		]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-espresso text-background/80",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-2xl text-background",
						children: "Vicky’s Place"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xs text-sm leading-relaxed",
						children: "A small beauty boutique built on slow rituals, honest formulas and a little bit of gold."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex gap-4 text-gold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								"aria-label": "Instagram",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-[1.15rem] w-[1.15rem]" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								"aria-label": "Facebook",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "h-[1.15rem] w-[1.15rem]" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								"aria-label": "YouTube",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Youtube, { className: "h-[1.15rem] w-[1.15rem]" })
							})
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FooterCol, {
					title: "Shop",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						children: "Shop All"
					}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/category/$slug",
						params: { slug: c.slug },
						children: c.name
					}, c.slug))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FooterCol, {
					title: "Help",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/faq",
							children: "Shipping & Returns"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/faq",
							children: "FAQ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							children: "Contact"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cart",
							children: "Your Bag"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FooterCol, {
					title: "Visit",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "18 Rosemary Lane" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Accra, Ghana" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "GPS: AK-039-5028" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "hello@vickysplace.com" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Mon–Sat, 10am–7pm" })
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-background/15",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs sm:flex-row sm:justify-between sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Vicky’s Place. All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Privacy · Terms · Accessibility" })]
			})
		})]
	});
}
function FooterCol({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "label-caps mb-5 text-gold",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-3 text-sm [&>a:hover]:text-background",
		children
	})] });
}
function CartDrawer() {
	const { lines, subtotal, setQty, remove, drawerOpen, setDrawerOpen } = useCart();
	if (!drawerOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-espresso/40 backdrop-blur-[2px]",
			onClick: () => setDrawerOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-[var(--shadow-lift)] sm:max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border px-6 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label-caps",
						children: "Your Bag"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Close cart",
						onClick: () => setDrawerOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto px-6",
					children: lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-16 text-center text-sm text-muted-foreground",
						children: "Your bag is empty."
					}) : lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 border-b border-border py-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: l.product.image,
								alt: l.product.name,
								loading: "lazy",
								className: "h-24 w-20 rounded-md object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "label-caps text-muted-foreground",
										children: l.product.brand
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm font-semibold",
										children: l.product.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-xs text-muted-foreground",
										children: l.variant
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyStepper, {
											qty: l.qty,
											onChange: (q) => setQty(l.key, q)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-serif text-sm text-gold",
											children: formatPrice(l.product.price * l.qty)
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Remove item",
								onClick: () => remove(l.key),
								className: "self-start text-muted-foreground hover:text-primary-deep",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})
						]
					}, l.key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border px-6 py-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-caps",
								children: "Subtotal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-serif text-lg",
								children: formatPrice(subtotal)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-xs text-muted-foreground",
							children: "Taxes and shipping calculated at checkout."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-col gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/checkout",
									onClick: () => setDrawerOpen(false),
									children: "Checkout"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/cart",
									onClick: () => setDrawerOpen(false),
									children: "View full bag"
								})
							})]
						})
					]
				})
			]
		})]
	});
}
function QtyStepper({ qty, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center rounded-md border border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Decrease quantity",
				className: "px-2.5 py-1.5 hover:text-primary-deep disabled:opacity-50 disabled:cursor-not-allowed",
				onClick: () => onChange(Math.max(1, qty - 1)),
				disabled: qty <= 1,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3.5 w-3.5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-7 text-center text-sm",
				children: qty
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Increase quantity",
				className: "px-2.5 py-1.5 hover:text-primary-deep",
				onClick: () => onChange(qty + 1),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
			})
		]
	});
}
function ScrollToTop() {
	const [isVisible, setIsVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const toggleVisibility = () => {
			if (window.pageYOffset > 300) setIsVisible(true);
			else setIsVisible(false);
		};
		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	if (!isVisible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: scrollToTop,
		className: "fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary-deep hover:scale-110",
		"aria-label": "Scroll to top",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-5 w-5" })
	});
}
var SessionCtx = (0, import_react.createContext)(null);
var mockProductsForCart = [];
function SessionProvider({ children }) {
	const [state, setState] = (0, import_react.useState)({
		cart: [],
		cartOpen: false,
		customer: null,
		wishlist: [],
		staff: null,
		sessionOrders: [],
		appliedDiscount: null
	});
	const cartTotal = (0, import_react.useMemo)(() => {
		let total = 0;
		state.cart.forEach((item) => {
			const variant = mockProductsForCart.find((p) => p.variants.some((v) => v.id === item.variantId));
			if (variant) {
				const price = variant.variants.find((v) => v.id === item.variantId)?.priceOverride || variant.basePrice;
				total += price * item.qty;
			}
		});
		return total;
	}, [state.cart]);
	const discountAmount = (0, import_react.useMemo)(() => {
		if (!state.appliedDiscount) return 0;
		return calculateDiscount(cartTotal, state.appliedDiscount);
	}, [cartTotal, state.appliedDiscount]);
	const deliveryFee = (0, import_react.useMemo)(() => {
		return calculateDeliveryFee(cartTotal - discountAmount);
	}, [cartTotal, discountAmount]);
	(0, import_react.useMemo)(() => {
		return cartTotal - discountAmount + deliveryFee;
	}, [
		cartTotal,
		discountAmount,
		deliveryFee
	]);
	const value = {
		state,
		addToCart: (0, import_react.useCallback)(async (productId, variantId, qty = 1) => {
			setState((prev) => {
				if (prev.cart.find((item) => item.variantId === variantId)) return {
					...prev,
					cart: prev.cart.map((item) => item.variantId === variantId ? {
						...item,
						qty: item.qty + qty
					} : item),
					cartOpen: true
				};
				return {
					...prev,
					cart: [...prev.cart, {
						variantId,
						productId,
						qty
					}],
					cartOpen: true
				};
			});
		}, []),
		removeFromCart: (0, import_react.useCallback)((variantId) => {
			setState((prev) => ({
				...prev,
				cart: prev.cart.filter((item) => item.variantId !== variantId)
			}));
		}, []),
		updateCartQty: (0, import_react.useCallback)((variantId, qty) => {
			setState((prev) => {
				if (qty <= 0) return {
					...prev,
					cart: prev.cart.filter((item) => item.variantId !== variantId)
				};
				return {
					...prev,
					cart: prev.cart.map((item) => item.variantId === variantId ? {
						...item,
						qty
					} : item)
				};
			});
		}, []),
		clearCart: (0, import_react.useCallback)(() => {
			setState((prev) => ({
				...prev,
				cart: [],
				appliedDiscount: null
			}));
		}, []),
		setCartOpen: (0, import_react.useCallback)((open) => {
			setState((prev) => ({
				...prev,
				cartOpen: open
			}));
		}, []),
		applyDiscountCode: (0, import_react.useCallback)(async (code) => {
			if ([
				"WELCOME10",
				"FIRST20",
				"FLAT15"
			].includes(code.toUpperCase())) {
				const discount = {
					code: code.toUpperCase(),
					type: code === "FLAT15" ? "fixed" : "percent",
					value: code === "FLAT15" ? 15 : code === "FIRST20" ? 20 : 10,
					active: true
				};
				setState((prev) => ({
					...prev,
					appliedDiscount: discount
				}));
				return true;
			}
			return false;
		}, []),
		removeDiscountCode: (0, import_react.useCallback)(() => {
			setState((prev) => ({
				...prev,
				appliedDiscount: null
			}));
		}, []),
		setCustomer: (0, import_react.useCallback)((customer) => {
			setState((prev) => ({
				...prev,
				customer
			}));
		}, []),
		addToWishlist: (0, import_react.useCallback)((productId) => {
			setState((prev) => ({
				...prev,
				wishlist: [...prev.wishlist, productId]
			}));
		}, []),
		removeFromWishlist: (0, import_react.useCallback)((productId) => {
			setState((prev) => ({
				...prev,
				wishlist: prev.wishlist.filter((id) => id !== productId)
			}));
		}, []),
		toggleWishlist: (0, import_react.useCallback)((productId) => {
			setState((prev) => ({
				...prev,
				wishlist: prev.wishlist.includes(productId) ? prev.wishlist.filter((id) => id !== productId) : [...prev.wishlist, productId]
			}));
		}, []),
		addCustomerAddress: (0, import_react.useCallback)((address) => {
			setState((prev) => {
				if (!prev.customer) return prev;
				return {
					...prev,
					customer: {
						...prev.customer,
						addresses: [...prev.customer.addresses, address]
					}
				};
			});
		}, []),
		updateCustomerAddress: (0, import_react.useCallback)((addressId, address) => {
			setState((prev) => {
				if (!prev.customer) return prev;
				return {
					...prev,
					customer: {
						...prev.customer,
						addresses: prev.customer.addresses.map((a) => a.id === addressId ? {
							...a,
							...address
						} : a)
					}
				};
			});
		}, []),
		removeCustomerAddress: (0, import_react.useCallback)((addressId) => {
			setState((prev) => {
				if (!prev.customer) return prev;
				return {
					...prev,
					customer: {
						...prev.customer,
						addresses: prev.customer.addresses.filter((a) => a.id !== addressId)
					}
				};
			});
		}, []),
		setDefaultAddress: (0, import_react.useCallback)((addressId) => {
			setState((prev) => {
				if (!prev.customer) return prev;
				return {
					...prev,
					customer: {
						...prev.customer,
						addresses: prev.customer.addresses.map((a) => ({
							...a,
							isDefault: a.id === addressId
						}))
					}
				};
			});
		}, []),
		setStaff: (0, import_react.useCallback)((staff) => {
			setState((prev) => ({
				...prev,
				staff
			}));
		}, []),
		logoutStaff: (0, import_react.useCallback)(() => {
			setState((prev) => ({
				...prev,
				staff: null
			}));
		}, []),
		addOrder: (0, import_react.useCallback)((order) => {
			setState((prev) => ({
				...prev,
				sessionOrders: [...prev.sessionOrders, order]
			}));
		}, []),
		updateOrderStatus: (0, import_react.useCallback)((orderId, status) => {
			setState((prev) => ({
				...prev,
				sessionOrders: prev.sessionOrders.map((o) => o.id === orderId ? {
					...o,
					status,
					updatedAt: (/* @__PURE__ */ new Date()).toISOString()
				} : o)
			}));
		}, [])
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionCtx.Provider, {
		value,
		children
	});
}
function useSession() {
	const ctx = (0, import_react.useContext)(SessionCtx);
	if (!ctx) throw new Error("useSession must be used inside SessionProvider");
	return ctx;
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[60vh] items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-caps text-gold",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-3xl",
					children: "This page slipped off the shelf"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "The page you’re looking for doesn’t exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep",
						children: "Back to home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[60vh] items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl",
					children: "This page didn’t load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex h-11 items-center justify-center rounded-md border border-border px-6 text-sm font-semibold transition-colors hover:border-primary",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$34 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Vicky's Place — Beauty & Cosmetics Boutique" },
			{
				name: "description",
				content: "Skincare, haircare, bath & body and makeup curated by Vicky's Place — warm, glowy essentials for everyday rituals."
			},
			{
				name: "author",
				content: "Vicky's Place"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$34.useRouteContext();
	const isAdminRoute = useLocation().pathname.startsWith("/admin");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [
			isAdminRoute ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-screen flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
				]
			}),
			!isAdminRoute && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {}),
			!isAdminRoute && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollToTop, {})
		] }) })
	});
}
var $$splitComponentImporter$33 = () => import("./routes-Cal-je9n.mjs");
var Route$33 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Vicky's Place — Beauty & Cosmetics Boutique" },
		{
			name: "description",
			content: "Glow-first skincare, haircare, bath & body and makeup, curated by Vicky's Place. Warm formulas, gold-touched packaging, everyday rituals."
		},
		{
			property: "og:title",
			content: "Vicky's Place — Beauty & Cosmetics Boutique"
		},
		{
			property: "og:description",
			content: "Glow-first skincare, haircare, bath & body and makeup, curated by Vicky's Place."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var $$splitComponentImporter$32 = () => import("./about-q5EO16Jw.mjs");
var Route$32 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: "About — Vicky's Place" }, {
		name: "description",
		content: "Learn about Vicky's Place, a small beauty boutique built on slow rituals, honest formulas and a little bit of gold."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./admin-DTpb8EHU.mjs");
var Route$31 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Admin Dashboard — Vicky's Place" }, {
		name: "description",
		content: "Manage products, orders, and customers for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./cart-D2tRFUC5.mjs");
var Route$30 = createFileRoute("/cart")({
	head: () => ({ meta: [{ title: "Your Bag — Vicky's Place" }, {
		name: "description",
		content: "View your shopping bag and checkout."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./checkout-BFxvw_KD.mjs");
var Route$29 = createFileRoute("/checkout")({
	head: () => ({ meta: [{ title: "Checkout — Vicky's Place" }, {
		name: "description",
		content: "Complete your purchase at Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./contact-2hSWUQIm.mjs");
var Route$28 = createFileRoute("/contact")({
	head: () => ({ meta: [{ title: "Contact — Vicky's Place" }, {
		name: "description",
		content: "Get in touch with Vicky's Place. Visit our store or send us a message."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./faq-RCORIhs6.mjs");
var Route$27 = createFileRoute("/faq")({
	head: () => ({ meta: [{ title: "FAQ — Vicky's Place" }, {
		name: "description",
		content: "Frequently asked questions about shipping, returns, and our products."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./shop-Cva1pzl4.mjs");
var Route$26 = createFileRoute("/shop")({
	head: () => ({ meta: [
		{ title: "Shop All — Vicky's Place" },
		{
			name: "description",
			content: "Browse every product at Vicky's Place: skincare, haircare, bath & body and makeup, filterable by brand, price and skin concern."
		},
		{
			property: "og:title",
			content: "Shop All — Vicky's Place"
		},
		{
			property: "og:description",
			content: "Every skincare, haircare, body and makeup product we stock."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
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
var $$splitComponentImporter$25 = () => import("./admin.index-D-KU_FAo.mjs");
var Route$25 = createFileRoute("/admin/")({
	head: () => ({ meta: [{ title: "Admin Dashboard — Vicky's Place" }, {
		name: "description",
		content: "Manage products, orders, and customers for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./admin.categories-GGCmtHb4.mjs");
var Route$24 = createFileRoute("/admin/categories")({
	head: () => ({ meta: [{ title: "Categories — Admin Dashboard" }, {
		name: "description",
		content: "Manage categories for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./admin.customers-BafogEsy.mjs");
var Route$23 = createFileRoute("/admin/customers")({
	head: () => ({ meta: [{ title: "Customers — Admin Dashboard" }, {
		name: "description",
		content: "Manage customers for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./admin.finance-D6rU8Tqa.mjs");
var Route$22 = createFileRoute("/admin/finance")({
	head: () => ({ meta: [{ title: "Finance — Admin Dashboard" }, {
		name: "description",
		content: "Manage finances for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./admin.login-Clj-7Qe_.mjs");
var Route$21 = createFileRoute("/admin/login")({
	head: () => ({ meta: [{ title: "Admin Login — Vicky's Place" }, {
		name: "description",
		content: "Staff login for Vicky's Place admin console."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./admin.loyalty-CgsxZcsk.mjs");
var Route$20 = createFileRoute("/admin/loyalty")({
	head: () => ({ meta: [{ title: "Loyalty — Admin Dashboard" }, {
		name: "description",
		content: "Manage loyalty programs for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./admin.orders-Bue7pRGi.mjs");
var Route$19 = createFileRoute("/admin/orders")({
	head: () => ({ meta: [{ title: "Orders — Admin Dashboard" }, {
		name: "description",
		content: "Manage orders for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./admin.pos-C1IezHR1.mjs");
var Route$18 = createFileRoute("/admin/pos")({
	head: () => ({ meta: [{ title: "POS — Admin Dashboard" }, {
		name: "description",
		content: "Point of Sale for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./admin.products-D_0svY9i.mjs");
var Route$17 = createFileRoute("/admin/products")({
	head: () => ({ meta: [{ title: "Products — Admin Dashboard" }, {
		name: "description",
		content: "Manage products for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./admin.purchase-orders-BMtTEmC3.mjs");
var Route$16 = createFileRoute("/admin/purchase-orders")({
	head: () => ({ meta: [{ title: "Purchase Orders — Admin Dashboard" }, {
		name: "description",
		content: "Manage purchase orders for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./admin.reconciliation-2ataU9t3.mjs");
var Route$15 = createFileRoute("/admin/reconciliation")({
	head: () => ({ meta: [{ title: "Cash Reconciliation — Admin Dashboard" }, {
		name: "description",
		content: "Daily sales reconciliation and cash management for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./admin.reports-mAE9S2I2.mjs");
var Route$14 = createFileRoute("/admin/reports")({
	head: () => ({ meta: [{ title: "Reports — Admin Dashboard" }, {
		name: "description",
		content: "Sales reports and analytics for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./admin.suppliers-DfhFMVgy.mjs");
var Route$13 = createFileRoute("/admin/suppliers")({
	head: () => ({ meta: [{ title: "Suppliers — Admin Dashboard" }, {
		name: "description",
		content: "Manage suppliers for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./category._slug-Bw58X1zB.mjs");
var Route$12 = createFileRoute("/category/$slug")({
	loader: ({ params }) => {
		const category = getCategory(params.slug);
		if (!category) throw notFound();
		return { category };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Category unavailable — Vicky's Place" }, {
			name: "robots",
			content: "noindex"
		}] };
		const { category } = loaderData;
		const title = `${category.name} — Vicky's Place`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: category.blurb
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: category.blurb
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./product._id-DhGTAU7u.mjs");
var Route$11 = createFileRoute("/product/$id")({
	loader: ({ params }) => {
		const product = getProduct(params.id);
		if (!product) throw notFound();
		return { product };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Product unavailable — Vicky's Place" }, {
			name: "robots",
			content: "noindex"
		}] };
		const { product } = loaderData;
		const title = `${product.name} — Vicky's Place`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: product.description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: product.description
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./admin.customers._id-6wOhaymB.mjs");
var Route$10 = createFileRoute("/admin/customers/$id")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./admin.finance.cash-flow-7TDx-4e2.mjs");
var Route$9 = createFileRoute("/admin/finance/cash-flow")({
	head: () => ({ meta: [{ title: "Cash Flow — Admin Dashboard" }, {
		name: "description",
		content: "View cash flow for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./admin.finance.invoices-DcQXPlPd.mjs");
var Route$8 = createFileRoute("/admin/finance/invoices")({
	head: () => ({ meta: [{ title: "Invoices — Admin Dashboard" }, {
		name: "description",
		content: "Manage invoices for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./admin.finance.profit-loss-B8Fvjjeo.mjs");
var Route$7 = createFileRoute("/admin/finance/profit-loss")({
	head: () => ({ meta: [{ title: "Profit & Loss — Admin Dashboard" }, {
		name: "description",
		content: "View profit and loss statement for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./admin.finance.tax-CjFvzlD1.mjs");
var Route$6 = createFileRoute("/admin/finance/tax")({
	head: () => ({ meta: [{ title: "Tax Settings — Admin Dashboard" }, {
		name: "description",
		content: "Manage tax settings for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin.ops.activity-CbnvbK7O.mjs");
var Route$5 = createFileRoute("/admin/ops/activity")({
	head: () => ({ meta: [{ title: "Activity Log — Admin Dashboard" }, {
		name: "description",
		content: "View activity log for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./admin.ops.calendar-Cpnqfcvk.mjs");
var Route$4 = createFileRoute("/admin/ops/calendar")({
	head: () => ({ meta: [{ title: "Calendar — Admin Dashboard" }, {
		name: "description",
		content: "View calendar for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./admin.ops.content-CnKq6C4U.mjs");
var Route$3 = createFileRoute("/admin/ops/content")({
	head: () => ({ meta: [{ title: "Content — Admin Dashboard" }, {
		name: "description",
		content: "Manage content for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./admin.ops.staff-kfsqzzgR.mjs");
var Route$2 = createFileRoute("/admin/ops/staff")({
	head: () => ({ meta: [{ title: "Staff — Admin Dashboard" }, {
		name: "description",
		content: "Manage staff for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./admin.ops.tasks-BZVwYZKG.mjs");
var Route$1 = createFileRoute("/admin/ops/tasks")({
	head: () => ({ meta: [{ title: "Tasks — Admin Dashboard" }, {
		name: "description",
		content: "Manage tasks for Vicky's Place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin.orders._id-C1ndb-fc.mjs");
var Route = createFileRoute("/admin/orders/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$33.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$34
});
var AboutRoute = Route$32.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$34
});
var AdminRoute = Route$31.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$34
});
var CartRoute = Route$30.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$34
});
var CheckoutRoute = Route$29.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$34
});
var ContactRoute = Route$28.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$34
});
var FaqRoute = Route$27.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$34
});
var ShopRoute = Route$26.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$34
});
var AdminIndexRoute = Route$25.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminCategoriesRoute = Route$24.update({
	id: "/categories",
	path: "/categories",
	getParentRoute: () => AdminRoute
});
var AdminCustomersRoute = Route$23.update({
	id: "/customers",
	path: "/customers",
	getParentRoute: () => AdminRoute
});
var AdminFinanceRoute = Route$22.update({
	id: "/finance",
	path: "/finance",
	getParentRoute: () => AdminRoute
});
var AdminLoginRoute = Route$21.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => AdminRoute
});
var AdminLoyaltyRoute = Route$20.update({
	id: "/loyalty",
	path: "/loyalty",
	getParentRoute: () => AdminRoute
});
var AdminOrdersRoute = Route$19.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => AdminRoute
});
var AdminPosRoute = Route$18.update({
	id: "/pos",
	path: "/pos",
	getParentRoute: () => AdminRoute
});
var AdminProductsRoute = Route$17.update({
	id: "/products",
	path: "/products",
	getParentRoute: () => AdminRoute
});
var AdminPurchaseOrdersRoute = Route$16.update({
	id: "/purchase-orders",
	path: "/purchase-orders",
	getParentRoute: () => AdminRoute
});
var AdminReconciliationRoute = Route$15.update({
	id: "/reconciliation",
	path: "/reconciliation",
	getParentRoute: () => AdminRoute
});
var AdminReportsRoute = Route$14.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AdminRoute
});
var AdminSuppliersRoute = Route$13.update({
	id: "/suppliers",
	path: "/suppliers",
	getParentRoute: () => AdminRoute
});
var CategorySlugRoute = Route$12.update({
	id: "/category/$slug",
	path: "/category/$slug",
	getParentRoute: () => Route$34
});
var ProductIdRoute = Route$11.update({
	id: "/product/$id",
	path: "/product/$id",
	getParentRoute: () => Route$34
});
var AdminCustomersIdRoute = Route$10.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AdminCustomersRoute
});
var AdminFinanceCashFlowRoute = Route$9.update({
	id: "/cash-flow",
	path: "/cash-flow",
	getParentRoute: () => AdminFinanceRoute
});
var AdminFinanceInvoicesRoute = Route$8.update({
	id: "/invoices",
	path: "/invoices",
	getParentRoute: () => AdminFinanceRoute
});
var AdminFinanceProfitLossRoute = Route$7.update({
	id: "/profit-loss",
	path: "/profit-loss",
	getParentRoute: () => AdminFinanceRoute
});
var AdminFinanceTaxRoute = Route$6.update({
	id: "/tax",
	path: "/tax",
	getParentRoute: () => AdminFinanceRoute
});
var AdminOpsActivityRoute = Route$5.update({
	id: "/ops/activity",
	path: "/ops/activity",
	getParentRoute: () => AdminRoute
});
var AdminOpsCalendarRoute = Route$4.update({
	id: "/ops/calendar",
	path: "/ops/calendar",
	getParentRoute: () => AdminRoute
});
var AdminOpsContentRoute = Route$3.update({
	id: "/ops/content",
	path: "/ops/content",
	getParentRoute: () => AdminRoute
});
var AdminOpsStaffRoute = Route$2.update({
	id: "/ops/staff",
	path: "/ops/staff",
	getParentRoute: () => AdminRoute
});
var AdminOpsTasksRoute = Route$1.update({
	id: "/ops/tasks",
	path: "/ops/tasks",
	getParentRoute: () => AdminRoute
});
var AdminOrdersIdRoute = Route.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AdminOrdersRoute
});
var AdminCustomersRouteChildren = { AdminCustomersIdRoute };
var AdminCustomersRouteWithChildren = AdminCustomersRoute._addFileChildren(AdminCustomersRouteChildren);
var AdminFinanceRouteChildren = {
	AdminFinanceCashFlowRoute,
	AdminFinanceInvoicesRoute,
	AdminFinanceProfitLossRoute,
	AdminFinanceTaxRoute
};
var AdminFinanceRouteWithChildren = AdminFinanceRoute._addFileChildren(AdminFinanceRouteChildren);
var AdminOrdersRouteChildren = { AdminOrdersIdRoute };
var AdminRouteChildren = {
	AdminCategoriesRoute,
	AdminCustomersRoute: AdminCustomersRouteWithChildren,
	AdminFinanceRoute: AdminFinanceRouteWithChildren,
	AdminLoginRoute,
	AdminLoyaltyRoute,
	AdminOrdersRoute: AdminOrdersRoute._addFileChildren(AdminOrdersRouteChildren),
	AdminPosRoute,
	AdminProductsRoute,
	AdminPurchaseOrdersRoute,
	AdminReconciliationRoute,
	AdminReportsRoute,
	AdminSuppliersRoute,
	AdminIndexRoute,
	AdminOpsActivityRoute,
	AdminOpsCalendarRoute,
	AdminOpsContentRoute,
	AdminOpsStaffRoute,
	AdminOpsTasksRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	CartRoute,
	CheckoutRoute,
	ContactRoute,
	FaqRoute,
	ShopRoute,
	CategorySlugRoute,
	ProductIdRoute
};
var routeTree = Route$34._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { Route$10 as a, getRouter as c, Route as i, router_exports as l, Label as n, Route$11 as o, ProductBrowser as r, Route$12 as s, Input as t, useSession as u };
