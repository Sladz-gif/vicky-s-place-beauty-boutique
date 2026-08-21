import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as LoaderCircle, G as CircleX, K as CircleCheckBig, U as CreditCard, m as Smartphone } from "../_libs/lucide-react.mjs";
import { o as useCart, r as Button, u as formatPrice } from "./router-DsJhwsz_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-BFxvw_KD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function usePaystackPayment() {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [reference, setReference] = (0, import_react.useState)(null);
	const paystackInstanceRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const script = document.createElement("script");
		script.src = "https://js.paystack.co/v1/inline.js";
		script.async = true;
		document.body.appendChild(script);
		return () => {
			document.body.removeChild(script);
		};
	}, []);
	const generateReference = (0, import_react.useCallback)(() => {
		return `VP_${Date.now()}_${Math.floor(Math.random() * 1e4)}`;
	}, []);
	return {
		status,
		reference,
		cancel: (0, import_react.useCallback)(() => {
			if (paystackInstanceRef.current) {
				paystackInstanceRef.current.close();
				paystackInstanceRef.current = null;
			}
			setStatus("idle");
			setReference(null);
		}, []),
		startPayment: (0, import_react.useCallback)((amount, email, paymentMethod, metadata = {}) => {
			const publicKey = "pk_test_your_public_key_here";
			const newReference = generateReference();
			setReference(newReference);
			setStatus("processing");
			const amountInKobo = Math.round(amount * 100);
			if (paymentMethod !== "card") {
				console.log("Mobile money payment initiated:", {
					reference: newReference,
					amount: amountInKobo,
					email,
					paymentMethod,
					metadata
				});
				setTimeout(() => {
					setStatus("success");
				}, 3e3);
				return;
			}
			if (window.PaystackPop) {
				paystackInstanceRef.current = window.PaystackPop.setup({
					key: publicKey,
					email,
					amount: amountInKobo,
					currency: "GHS",
					ref: newReference,
					metadata: { custom_fields: [{
						display_name: "Payment Method",
						variable_name: "payment_method",
						value: paymentMethod
					}, ...Object.entries(metadata).map(([key, value]) => ({
						display_name: key,
						variable_name: key,
						value: String(value)
					}))] },
					callback: (response) => {
						console.log("Payment successful:", response);
						setStatus("success");
						paystackInstanceRef.current = null;
					},
					onClose: () => {
						console.log("Payment closed");
						if (status === "processing") setStatus("cancelled");
						paystackInstanceRef.current = null;
					}
				});
				paystackInstanceRef.current.openIframe();
			} else {
				console.error("PaystackPop not loaded");
				setStatus("failed");
			}
		}, [generateReference, status])
	};
}
function Checkout() {
	const navigate = useNavigate();
	const { lines, subtotal, clearCart } = useCart();
	const payment = usePaystackPayment();
	const [email, setEmail] = (0, import_react.useState)("");
	const [firstName, setFirstName] = (0, import_react.useState)("");
	const [lastName, setLastName] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("card");
	const [momoNumber, setMomoNumber] = (0, import_react.useState)("");
	const [formErrors, setFormErrors] = (0, import_react.useState)({});
	const shipping = subtotal >= 100 ? 0 : 15;
	const total = subtotal + shipping;
	const validateForm = () => {
		const errors = {};
		if (!email || !email.includes("@")) errors.email = "Please enter a valid email address";
		if (!firstName) errors.firstName = "First name is required";
		if (!lastName) errors.lastName = "Last name is required";
		if (!address) errors.address = "Address is required";
		if (!city) errors.city = "City is required";
		if (!phone) errors.phone = "Phone number is required";
		if (paymentMethod !== "card" && !momoNumber) errors.momoNumber = "Mobile money number is required";
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};
	const handlePayment = (e) => {
		e.preventDefault();
		if (lines.length === 0) {
			alert("Your cart is empty");
			return;
		}
		if (!validateForm()) return;
		`${firstName}${lastName}`;
		payment.startPayment(total, email, paymentMethod, {
			first_name: firstName,
			last_name: lastName,
			phone,
			momo_number: momoNumber,
			address,
			city,
			cart_items: lines.map((line) => ({
				product_id: line.product.id,
				variant: line.variant,
				quantity: line.qty
			}))
		});
	};
	if (payment.status === "success") {
		clearCart();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-b border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-[88rem] px-5 py-20 sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-md text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-10 w-10 text-green-600" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-serif text-gold",
							children: "Payment Successful!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-muted-foreground",
							children: [
								"Thank you for your order. We've sent a confirmation email to ",
								email,
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: ["Order reference: ", payment.reference]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 flex justify-center gap-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => navigate({ to: "/" }),
								children: "Continue Shopping"
							})
						})
					]
				})
			})
		});
	}
	if (payment.status === "processing") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-b border-border bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-[88rem] px-5 py-20 sm:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-md text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-10 w-10 animate-spin text-primary" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-serif text-gold",
						children: "Processing Payment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground",
						children: "Please complete the payment in the popup window."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: ["Order reference: ", payment.reference]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "mt-8",
						onClick: payment.cancel,
						children: "Cancel Payment"
					})
				]
			})
		})
	});
	if (payment.status === "failed") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-b border-border bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-[88rem] px-5 py-20 sm:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-md text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-10 w-10 text-red-600" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-serif text-gold",
						children: "Payment Failed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground",
						children: "There was an issue processing your payment. Please try again."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-8",
						onClick: () => payment.cancel(),
						children: "Try Again"
					})
				]
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-b border-border bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[88rem] px-5 py-20 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label-caps text-gold",
					children: "Checkout"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 text-4xl md:text-5xl",
					children: "Complete your order"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-rule my-8" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-12 lg:grid-cols-[1fr_400px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "space-y-8",
						onSubmit: handlePayment,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-lg",
								children: "Contact Information"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
									placeholder: "Email address"
								}), formErrors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-red-600",
									children: formErrors.email
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "tel",
									value: phone,
									onChange: (e) => setPhone(e.target.value),
									className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
									placeholder: "Phone number"
								}), formErrors.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-red-600",
									children: formErrors.phone
								})] })]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-lg",
								children: "Shipping Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: firstName,
										onChange: (e) => setFirstName(e.target.value),
										className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
										placeholder: "First name"
									}), formErrors.firstName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-red-600",
										children: formErrors.firstName
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: lastName,
										onChange: (e) => setLastName(e.target.value),
										className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
										placeholder: "Last name"
									}), formErrors.lastName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-red-600",
										children: formErrors.lastName
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: address,
											onChange: (e) => setAddress(e.target.value),
											className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
											placeholder: "Address"
										}), formErrors.address && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-red-600",
											children: formErrors.address
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: city,
										onChange: (e) => setCity(e.target.value),
										className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
										placeholder: "City"
									}), formErrors.city && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-red-600",
										children: formErrors.city
									})] })
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-serif text-lg",
									children: "Payment Method"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 grid gap-3 sm:grid-cols-2",
									children: [
										{
											value: "card",
											label: "Card",
											icon: CreditCard
										},
										{
											value: "mtn_momo",
											label: "MTN MoMo",
											icon: Smartphone
										},
										{
											value: "vodafone_cash",
											label: "Vodafone Cash",
											icon: Smartphone
										},
										{
											value: "airteltigo_money",
											label: "AirtelTigo",
											icon: Smartphone
										}
									].map((method) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setPaymentMethod(method.value),
										className: `flex items-center gap-3 rounded-md border p-4 text-left transition-colors ${paymentMethod === method.value ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(method.icon, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: method.label
										})]
									}, method.value))
								}),
								paymentMethod !== "card" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "tel",
											value: momoNumber,
											onChange: (e) => setMomoNumber(e.target.value),
											className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
											placeholder: `Enter your ${paymentMethod === "mtn_momo" ? "MTN" : paymentMethod === "vodafone_cash" ? "Vodafone" : "AirtelTigo"} number`
										}),
										formErrors.momoNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-red-600",
											children: formErrors.momoNumber
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-xs text-muted-foreground",
											children: "You will receive a prompt on your phone to authorize the payment"
										})
									]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								size: "lg",
								className: "w-full",
								disabled: lines.length === 0,
								children: ["Pay ", formatPrice(total)]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-fit space-y-6 rounded-lg border border-border p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-lg",
								children: "Order Summary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: line.product.image,
											alt: line.product.name,
											className: "h-16 w-16 rounded-md object-cover"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-medium",
													children: line.product.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: line.variant
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "mt-1 text-sm",
													children: ["Qty: ", line.qty]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium",
											children: formatPrice(line.product.price * line.qty)
										})
									]
								}, line.key))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 text-sm border-t border-border pt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Subtotal"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(subtotal) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Shipping"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: shipping === 0 ? "Free" : formatPrice(shipping) })]
									}),
									shipping > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Free shipping on orders over ₵100"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between font-semibold text-base",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(total) })]
									})
								]
							})
						]
					})]
				})
			]
		})
	});
}
//#endregion
export { Checkout as component };
