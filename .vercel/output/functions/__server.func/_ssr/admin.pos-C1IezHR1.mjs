import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as CircleX, K as CircleCheckBig, S as Plus, T as Minus, U as CreditCard, V as DollarSign, W as Clock, X as Check, b as RefreshCw, c as Trash2, i as User, m as Smartphone, n as X, v as Search, x as Printer } from "../_libs/lucide-react.mjs";
import { C as mockProducts, _ as formatPrice } from "./router-DsJhwsz_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.pos-C1IezHR1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function usePaystackQRPayment() {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [qrUrl, setQrUrl] = (0, import_react.useState)(null);
	const [reference, setReference] = (0, import_react.useState)(null);
	const timeoutRef = (0, import_react.useRef)(null);
	const generateReference = (0, import_react.useCallback)(() => {
		return `sale_${Date.now()}_${Math.floor(Math.random() * 1e4)}`;
	}, []);
	const cancel = (0, import_react.useCallback)(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		setStatus("idle");
		setQrUrl(null);
		setReference(null);
	}, []);
	const markSuccess = (0, import_react.useCallback)(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		setStatus("success");
	}, []);
	return {
		status,
		qrUrl,
		reference,
		cancel,
		startPayment: (0, import_react.useCallback)((amount, customerEmail, customerName) => {
			const newReference = generateReference();
			setReference(newReference);
			const paystackKey = "pk_test_your_public_key_here";
			console.log("Paystack key found:", "YES");
			console.log("Paystack key value:", paystackKey);
			const paymentLink = `https://checkout.paystack.co/${paystackKey}?amount=${amount * 100}&reference=${newReference}&email=${encodeURIComponent(customerEmail)}&metadata=${encodeURIComponent(JSON.stringify({ customer_name: customerName }))}`;
			const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(paymentLink)}`;
			setQrUrl(qrApiUrl);
			setStatus("pending");
			console.log("Payment started with reference:", newReference);
			console.log("Payment link:", paymentLink);
			timeoutRef.current = setTimeout(() => {
				setStatus("timeout");
			}, 3e5);
		}, [generateReference]),
		markSuccess
	};
}
function PaymentQRCode({ status, qrUrl, reference, onCancel, onRetry, onConfirmPayment }) {
	const getStatusMessage = () => {
		switch (status) {
			case "pending": return "Waiting for customer to scan and complete payment...";
			case "success": return "Payment completed successfully!";
			case "failed": return "Payment failed. Please try again.";
			case "timeout": return "Payment timed out. Please try again.";
			default: return "";
		}
	};
	const getStatusIcon = () => {
		switch (status) {
			case "success": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-12 w-12 text-green-600" });
			case "failed": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-12 w-12 text-red-600" });
			case "timeout": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-12 w-12 text-orange-600" });
			default: return null;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-lg",
					children: "Card Payment"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onCancel,
					className: "p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}),
			status === "pending" && qrUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white p-4 rounded-lg border border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: qrUrl,
							alt: "Payment QR Code",
							className: "w-64 h-64 max-w-full h-auto"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-center text-muted-foreground",
						children: "Scan this QR code with your phone to complete payment"
					}),
					reference && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: ["Reference: ", reference]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Waiting for payment..." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onConfirmPayment,
						className: "flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), "Confirm Payment Received"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground text-center",
						children: "Click this button after customer confirms payment on their phone"
					})
				]
			}),
			(status === "success" || status === "failed" || status === "timeout") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-4 py-8",
				children: [
					getStatusIcon(),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg font-semibold",
						children: getStatusMessage()
					}),
					(status === "failed" || status === "timeout") && onRetry && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onRetry,
						className: "flex items-center gap-2 px-4 py-2 rounded-md border border-border hover:bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" }), "Try Again"]
					})
				]
			})
		]
	});
}
function AdminPOS() {
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [cart, setCart] = (0, import_react.useState)([]);
	const [customerName, setCustomerName] = (0, import_react.useState)("");
	const [customerPhone, setCustomerPhone] = (0, import_react.useState)("");
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("cash");
	const [amountReceived, setAmountReceived] = (0, import_react.useState)("");
	const [isCartModalOpen, setIsCartModalOpen] = (0, import_react.useState)(false);
	const qrPayment = usePaystackQRPayment();
	const filteredProducts = mockProducts.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.sku.toLowerCase().includes(searchQuery.toLowerCase()) || product.barcode?.toLowerCase().includes(searchQuery.toLowerCase()));
	const subtotal = cart.reduce((sum, item) => sum + (item.variant.priceOverride || item.product.basePrice) * item.qty, 0);
	const total = subtotal;
	const change = amountReceived ? parseFloat(amountReceived) - total : 0;
	const addToCart = (product, variant) => {
		if (cart.find((item) => item.variant.id === variant.id)) setCart(cart.map((item) => item.variant.id === variant.id ? {
			...item,
			qty: item.qty + 1
		} : item));
		else setCart([...cart, {
			variant,
			product,
			qty: 1
		}]);
	};
	const updateCartQty = (variantId, delta) => {
		setCart(cart.map((item) => {
			if (item.variant.id === variantId) {
				const newQty = Math.max(0, item.qty + delta);
				return {
					...item,
					qty: newQty
				};
			}
			return item;
		}).filter((item) => item.qty > 0));
	};
	const removeFromCart = (variantId) => {
		setCart(cart.filter((item) => item.variant.id !== variantId));
	};
	const handleCheckout = () => {
		if (cart.length === 0) {
			alert("Cart is empty");
			return;
		}
		if (paymentMethod === "cash" && (!amountReceived || parseFloat(amountReceived) < total)) {
			alert("Please enter a valid amount received");
			return;
		}
		if (paymentMethod === "card") {
			const customerEmail = customerPhone ? `${customerPhone}@vickysplace.com` : "customer@vickysplace.com";
			qrPayment.startPayment(total, customerEmail, customerName || "Guest");
		} else {
			console.log("Processing sale:", {
				items: cart,
				customer: {
					name: customerName,
					phone: customerPhone
				},
				paymentMethod,
				total,
				amountReceived: paymentMethod === "cash" ? parseFloat(amountReceived) : total,
				change: paymentMethod === "cash" ? change : 0
			});
			alert("Sale completed successfully!");
			setCart([]);
			setCustomerName("");
			setCustomerPhone("");
			setAmountReceived("");
			setPaymentMethod("cash");
		}
	};
	const handlePaymentSuccess = () => {
		console.log("Processing sale:", {
			items: cart,
			customer: {
				name: customerName,
				phone: customerPhone
			},
			paymentMethod,
			total,
			paymentReference: qrPayment.reference
		});
		alert("Payment successful! Sale completed.");
		setCart([]);
		setCustomerName("");
		setCustomerPhone("");
		setAmountReceived("");
		setPaymentMethod("cash");
		qrPayment.cancel();
	};
	const handlePrintReceipt = () => {
		console.log("Printing receipt for sale:", {
			items: cart,
			customer: {
				name: customerName,
				phone: customerPhone
			},
			paymentMethod,
			total,
			paymentReference: qrPayment.reference
		});
		alert("Receipt printed!");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4 lg:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-between mb-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
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
					children: "Point of Sale"
				})
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-[1fr_450px] h-[calc(100vh-180px)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						placeholder: "Search by name, SKU, or scan barcode...",
						className: "h-14 w-full rounded-lg border border-border bg-card pl-12 pr-4 text-base outline-none focus:border-primary",
						autoFocus: true
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-2 pb-6",
					children: filteredProducts.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-6 hover:border-primary cursor-pointer transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-square bg-muted rounded-lg mb-4 overflow-hidden",
								children: product.images[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: product.images[0],
									alt: product.name,
									className: "w-full h-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full h-full flex items-center justify-center text-muted-foreground",
									children: "No image"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-base mb-2",
								children: product.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground mb-3",
								children: ["SKU: ", product.sku]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-primary text-lg",
								children: formatPrice(product.basePrice)
							}),
							product.variants.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 space-y-3",
								children: product.variants.map((variant) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => addToCart(product, variant),
									disabled: variant.stockQty === 0,
									className: `w-full text-left p-3 rounded-md text-sm border ${variant.stockQty === 0 ? "border-border bg-muted text-muted-foreground cursor-not-allowed" : "border-border hover:border-primary hover:bg-primary/5"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: variant.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: variant.stockQty <= variant.reorderPoint ? "text-red-600" : "",
											children: [variant.stockQty, " in stock"]
										})]
									})
								}, variant.id))
							}),
							product.variants.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => addToCart(product, {
									id: product.id,
									productId: product.id,
									label: "Default",
									skuSuffix: "",
									stockQty: 0,
									reorderPoint: 0
								}),
								className: "w-full mt-3 p-2 rounded-md text-xs border border-border hover:border-primary hover:bg-primary/5",
								children: "Add to Cart"
							})
						]
					}, product.id))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-card flex flex-col h-full overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-6 border-b border-border flex-shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-xl",
							children: "Current Sale"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 overflow-y-auto p-6 min-h-0",
						children: cart.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-center h-full text-muted-foreground",
							children: "Cart is empty"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: cart.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4 p-5 bg-muted/30 rounded-lg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold text-base truncate",
												children: item.product.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted-foreground",
												children: item.variant.label
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-base font-semibold mt-2",
												children: formatPrice(item.variant.priceOverride || item.product.basePrice)
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => updateCartQty(item.variant.id, -1),
												className: "p-2 hover:bg-muted rounded-md",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-5 w-5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-12 text-center font-semibold text-lg",
												children: item.qty
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => updateCartQty(item.variant.id, 1),
												className: "p-2 hover:bg-muted rounded-md",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5" })
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => removeFromCart(item.variant.id),
										className: "p-2 hover:bg-muted rounded-md text-red-600",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-5 w-5" })
									})
								]
							}, item.variant.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border flex-shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 space-y-5 overflow-y-auto max-h-[300px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: customerName,
											onChange: (e) => setCustomerName(e.target.value),
											placeholder: "Customer name (optional)",
											className: "flex-1 h-10 rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "tel",
											value: customerPhone,
											onChange: (e) => setCustomerPhone(e.target.value),
											placeholder: "Phone number (optional)",
											className: "flex-1 h-10 rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-base",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Subtotal"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(subtotal) })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-base",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Total"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-2xl",
											children: formatPrice(total)
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-base font-semibold",
										children: "Payment Method"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-3 gap-3",
										children: [
											{
												value: "cash",
												icon: DollarSign,
												label: "Cash"
											},
											{
												value: "card",
												icon: CreditCard,
												label: "Card"
											},
											{
												value: "mtn_momo",
												icon: Smartphone,
												label: "MTN MoMo"
											},
											{
												value: "vodafone_cash",
												icon: Smartphone,
												label: "Vodafone"
											},
											{
												value: "airteltigo_money",
												icon: Smartphone,
												label: "AirtelTigo"
											}
										].map((method) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												setPaymentMethod(method.value);
												if (method.value === "card") qrPayment.cancel();
											},
											className: `flex flex-col items-center gap-2 p-3 rounded-md border text-sm ${paymentMethod === method.value ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(method.icon, { className: "h-6 w-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: method.label })]
										}, method.value))
									})]
								}),
								paymentMethod === "cash" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-base font-semibold mb-3",
										children: "Amount Received"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: amountReceived,
										onChange: (e) => setAmountReceived(e.target.value),
										placeholder: "Enter amount",
										className: "w-full h-12 rounded-md border border-border bg-card px-4 text-base outline-none focus:border-primary"
									}),
									amountReceived && parseFloat(amountReceived) >= total && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 text-base",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Change: "
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-green-600 text-lg",
											children: formatPrice(change)
										})]
									})
								] }),
								paymentMethod === "card" && qrPayment.status !== "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentQRCode, {
									status: qrPayment.status,
									qrUrl: qrPayment.qrUrl,
									reference: qrPayment.reference,
									onCancel: qrPayment.cancel,
									onConfirmPayment: qrPayment.markSuccess,
									onRetry: () => {
										qrPayment.cancel();
										const customerEmail = customerPhone ? `${customerPhone}@vickysplace.com` : "customer@vickysplace.com";
										qrPayment.startPayment(total, customerEmail, customerName || "Guest");
									}
								}),
								paymentMethod === "card" && qrPayment.status === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handlePaymentSuccess,
									className: "w-full flex items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-green-700",
									children: "Complete Sale"
								}),
								paymentMethod !== "card" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleCheckout,
									disabled: cart.length === 0,
									className: "w-full flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-deep disabled:opacity-50 disabled:cursor-not-allowed",
									children: "Complete Sale"
								}),
								paymentMethod === "card" && qrPayment.status === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleCheckout,
									disabled: cart.length === 0,
									className: "w-full flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-deep disabled:opacity-50 disabled:cursor-not-allowed",
									children: "Start Card Payment"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-6 pt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handlePrintReceipt,
								className: "w-full flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-base hover:bg-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-5 w-5" }), "Print Receipt"]
							})
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
export { AdminPOS as component };
