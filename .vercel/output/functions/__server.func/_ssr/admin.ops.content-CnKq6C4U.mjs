import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as Save } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.ops.content-CnKq6C4U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var mockContentPages = [
	{
		slug: "about",
		title: "About Vicky's Place",
		content: `# About Vicky's Place

It started as a shelf in Vicky's living room in Accra. Friends kept borrowing her serums, so she started ordering doubles. Seven years later, the shelf is a boutique, and the rule is unchanged: nothing goes on it unless she uses it herself.

## Our Story

Vicky's Place was founded in 2019 with a simple mission: to bring the world's best skincare and beauty products to Ghana, curated with care and honesty. We believe that everyone deserves access to quality products that actually work.

## Our Values

**Quality First**: Every product on our shelf is tested by our team. If we wouldn't use it, we won't sell it.

**Honest Pricing**: We believe in fair, transparent pricing. No hidden markups, no gimmicks.

**Customer Care**: Your satisfaction is our priority. We're here to help you find the right products for your skin and hair.

## Our Commitment

We source from trusted international brands like CeraVe, Vaseline, Neutrogena, and more, ensuring that you get authentic products every time. Our team is constantly researching and testing new products to expand our carefully curated selection.

Visit us at our Accra location or shop online. We're here to help you glow, gently.`,
		updatedAt: "2024-03-20T00:00:00Z"
	},
	{
		slug: "contact",
		title: "Contact Us",
		content: `# Contact Us

We'd love to hear from you! Whether you have questions about products, orders, or just want to say hello, we're here to help.

## Visit Our Store

**Vicky's Place Beauty Boutique**
18 Rosemary Lane
Accra, Ghana
GPS: AK-039-5028

**Hours:**
- Monday - Saturday: 10:00 AM - 7:00 PM
- Sunday: Closed

## Get in Touch

**Phone:** +233 24 123 4567
**Email:** hello@vickysplace.com

## Follow Us

Stay connected with us on social media for the latest product arrivals, beauty tips, and exclusive offers.

- **Instagram:** @vickysplacegh
- **Facebook:** Vicky's Place Ghana
- **Twitter:** @vickysplacegh

## Customer Service

For order inquiries, product questions, or any other assistance, our customer service team is available during business hours. We typically respond within 24 hours.

## Wholesale Inquiries

Interested in stocking Vicky's Place products? Contact us at wholesale@vickysplace.com for wholesale opportunities.`,
		updatedAt: "2024-03-15T00:00:00Z"
	},
	{
		slug: "faq",
		title: "Frequently Asked Questions",
		content: `# Frequently Asked Questions

## Ordering & Payment

**How do I place an order?**
Simply browse our products, add items to your cart, and proceed to checkout. You can pay using Mobile Money (MTN MoMo, Vodafone Cash, AirtelTigo) or card.

**What payment methods do you accept?**
We accept:
- MTN Mobile Money
- Vodafone Cash
- AirtelTigo Money
- Visa/Mastercard

**Is my payment information secure?**
Yes, all payments are processed securely. We never store your payment details.

## Shipping & Delivery

**Do you ship outside Ghana?**
Currently, we only ship within Ghana.

**How long does delivery take?**
- Accra: 1-2 business days
- Other regions: 2-5 business days

**How much is shipping?**
Shipping is ₵15 for orders under ₵100. Orders over ₵100 get free shipping.

**How can I track my order?**
You'll receive a tracking number via SMS and email once your order ships.

## Returns & Refunds

**What is your return policy?**
We accept returns within 7 days of delivery if the product is unopened and in original condition.

**How do I initiate a return?**
Contact us at hello@vickysplace.com with your order number and reason for return.

**When will I receive my refund?**
Refunds are processed within 5-7 business days after we receive the returned item.

## Products

**Are your products authentic?**
Yes, we source directly from authorized distributors and brand representatives.

**Do you test products on animals?**
Many of the brands we carry are cruelty-free. Check individual product descriptions for details.

**Can you help me choose the right products?**
Absolutely! Contact us with your skin/hair concerns, and our team will recommend products tailored to your needs.

## Account

**Do I need an account to shop?**
No, you can checkout as a guest. However, creating an account lets you track orders and save addresses.

**How do I reset my password?**
Click "Forgot Password" on the login page, and we'll send you a reset link.`,
		updatedAt: "2024-03-10T00:00:00Z"
	},
	{
		slug: "shipping-returns",
		title: "Shipping & Returns",
		content: `# Shipping & Returns

## Shipping Information

### Delivery Areas
We deliver to all regions in Ghana using reliable courier services.

### Delivery Times
- **Greater Accra:** 1-2 business days
- **Ashanti Region:** 2-3 business days
- **Eastern Region:** 2-3 business days
- **Other Regions:** 3-5 business days

### Shipping Fees
- Orders under ₵100: ₵15
- Orders ₵100 and above: FREE

### Order Processing
Orders are processed within 24 hours on business days. You'll receive a confirmation email with tracking information once your order ships.

### Delivery Instructions
- Ensure someone is available at the delivery address
- Provide accurate GPS address and landmark
- Include correct phone number for delivery coordination

## Returns & Exchanges

### Return Policy
We want you to be completely satisfied with your purchase. If you're not, we accept returns within 7 days of delivery.

### Conditions for Return
- Product must be unopened and in original packaging
- Original receipt or proof of purchase required
- Return request must be made within 7 days of delivery

### Non-Returnable Items
- Opened or used products
- Items without original packaging
- Personal care items (due to hygiene reasons)

### How to Return
1. Contact us at hello@vickysplace.com
2. Provide your order number and reason for return
3. We'll provide a return authorization and instructions
4. Pack the item securely in original packaging
5. Ship to the address provided

### Refunds
Refunds are processed within 5-7 business days after we receive and inspect the returned item. Refunds are issued to the original payment method.

### Exchanges
We don't offer direct exchanges. If you'd like a different product, please return the original item and place a new order.

## Damaged or Defective Items

If you receive a damaged or defective product, contact us immediately with photos of the damage. We'll arrange a replacement or refund at no additional cost.

## Questions?

If you have any questions about shipping or returns, contact us at hello@vickysplace.com or call +233 24 123 4567.`,
		updatedAt: "2024-03-05T00:00:00Z"
	}
];
function AdminContent() {
	const [selectedPage, setSelectedPage] = (0, import_react.useState)(null);
	const [editedContent, setEditedContent] = (0, import_react.useState)("");
	const [editedTitle, setEditedTitle] = (0, import_react.useState)("");
	const handleSelectPage = (page) => {
		setSelectedPage(page);
		setEditedContent(page.content);
		setEditedTitle(page.title);
	};
	const handleSave = () => {
		if (selectedPage) {
			console.log("Saving content for:", selectedPage.slug, {
				title: editedTitle,
				content: editedContent
			});
			alert(`Saved changes to ${selectedPage.title}`);
		}
	};
	selectedPage || mockContentPages[0];
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/ops/content",
					className: "text-sm text-muted-foreground hover:text-foreground",
					children: "Ops"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-2 text-muted-foreground",
					children: "/"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl md:text-3xl",
					children: "Content"
				})
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-serif text-lg mb-4",
					children: "Pages"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: mockContentPages.map((page) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleSelectPage(page),
						className: `w-full rounded-lg border border-border p-4 text-left transition-colors hover:border-primary ${selectedPage?.slug === page.slug ? "border-primary bg-primary/5" : "bg-muted/30"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-semibold",
							children: page.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: ["/", page.slug]
						})]
					}, page.slug))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2 rounded-lg border border-border bg-card p-6",
				children: selectedPage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-serif text-lg",
						children: ["Edit: ", selectedPage.title]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSave,
						className: "flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), "Save Changes"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Title"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: editedTitle,
							onChange: (e) => setEditedTitle(e.target.value),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Content"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: editedContent,
							onChange: (e) => setEditedContent(e.target.value),
							rows: 20,
							className: "w-full rounded-md border border-border bg-card p-4 text-sm outline-none focus:border-primary resize-y"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: ["Last updated: ", selectedPage.updatedAt]
						})
					]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center text-muted-foreground",
					children: "Select a page to edit"
				})
			})]
		})]
	});
}
//#endregion
export { AdminContent as component };
