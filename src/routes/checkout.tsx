import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, Smartphone, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";

import { useCart } from "@/lib/cart";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/Button";
import { usePaystackPayment } from "@/hooks/usePaystackPayment";

type PaymentMethod = "card" | "mtn_momo" | "vodafone_cash" | "airteltigo_money";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Vicky's Place" },
      {
        name: "description",
        content: "Complete your purchase at Vicky's Place.",
      },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const navigate = useNavigate();
  const { lines, subtotal, clearCart } = useCart();
  const payment = usePaystackPayment();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [momoNumber, setMomoNumber] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const shipping = subtotal >= 100 ? 0 : 15;
  const total = subtotal + shipping;

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!email || !email.includes("@")) {
      errors.email = "Please enter a valid email address";
    }
    if (!firstName) {
      errors.firstName = "First name is required";
    }
    if (!lastName) {
      errors.lastName = "Last name is required";
    }
    if (!address) {
      errors.address = "Address is required";
    }
    if (!city) {
      errors.city = "City is required";
    }
    if (!phone) {
      errors.phone = "Phone number is required";
    }
    if (paymentMethod !== "card" && !momoNumber) {
      errors.momoNumber = "Mobile money number is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (lines.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!validateForm()) {
      return;
    }

    const customerName = `${firstName} ${lastName}`;

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
        quantity: line.qty,
      })),
    });
  };

  // Handle payment success
  if (payment.status === "success") {
    // Clear cart after successful payment
    clearCart();

    return (
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-serif text-gold">Payment Successful!</h1>
            <p className="mt-4 text-muted-foreground">
              Thank you for your order. We've sent a confirmation email to {email}.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Order reference: {payment.reference}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button onClick={() => navigate({ to: "/" })}>Continue Shopping</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle payment processing
  if (payment.status === "processing") {
    return (
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
            <h1 className="text-3xl font-serif text-gold">Processing Payment</h1>
            <p className="mt-4 text-muted-foreground">
              Please complete the payment in the popup window.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Order reference: {payment.reference}
            </p>
            <Button variant="outline" className="mt-8" onClick={payment.cancel}>
              Cancel Payment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle payment failed
  if (payment.status === "failed") {
    return (
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-serif text-gold">Payment Failed</h1>
            <p className="mt-4 text-muted-foreground">
              There was an issue processing your payment. Please try again.
            </p>
            <Button className="mt-8" onClick={() => payment.cancel()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8">
        <p className="label-caps text-gold">Checkout</p>
        <h1 className="mt-6 text-4xl md:text-5xl">Complete your order</h1>
        <div className="gold-rule my-8" />
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          <form className="space-y-8" onSubmit={handlePayment}>
            <div>
              <h3 className="font-serif text-lg">Contact Information</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                    placeholder="Email address"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                    placeholder="Phone number"
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-lg">Shipping Address</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                    placeholder="First name"
                  />
                  {formErrors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                    placeholder="Last name"
                  />
                  {formErrors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                    placeholder="Address"
                  />
                  {formErrors.address && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                    placeholder="City"
                  />
                  {formErrors.city && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-lg">Payment Method</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { value: "card" as PaymentMethod, label: "Card", icon: CreditCard },
                  { value: "mtn_momo" as PaymentMethod, label: "MTN MoMo", icon: Smartphone },
                  {
                    value: "vodafone_cash" as PaymentMethod,
                    label: "Vodafone Cash",
                    icon: Smartphone,
                  },
                  {
                    value: "airteltigo_money" as PaymentMethod,
                    label: "AirtelTigo",
                    icon: Smartphone,
                  },
                ].map((method) => (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() => setPaymentMethod(method.value)}
                    className={`flex items-center gap-3 rounded-md border p-4 text-left transition-colors ${
                      paymentMethod === method.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    <method.icon className="h-5 w-5" />
                    <span className="font-medium">{method.label}</span>
                  </button>
                ))}
              </div>
              {paymentMethod !== "card" && (
                <div className="mt-4">
                  <input
                    type="tel"
                    value={momoNumber}
                    onChange={(e) => setMomoNumber(e.target.value)}
                    className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                    placeholder={`Enter your ${paymentMethod === "mtn_momo" ? "MTN" : paymentMethod === "vodafone_cash" ? "Vodafone" : "AirtelTigo"} number`}
                  />
                  {formErrors.momoNumber && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.momoNumber}</p>
                  )}
                  <p className="mt-2 text-xs text-muted-foreground">
                    You will receive a prompt on your phone to authorize the payment
                  </p>
                </div>
              )}
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={lines.length === 0}>
              Pay {formatPrice(total)}
            </Button>
          </form>
          <div className="h-fit space-y-6 rounded-lg border border-border p-6">
            <h3 className="font-serif text-lg">Order Summary</h3>
            <div className="space-y-4">
              {lines.map((line) => (
                <div key={line.key} className="flex gap-3">
                  <img
                    src={line.product.image}
                    alt={line.product.name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{line.product.name}</p>
                    <p className="text-xs text-muted-foreground">{line.variant}</p>
                    <p className="mt-1 text-sm">Qty: {line.qty}</p>
                  </div>
                  <p className="text-sm font-medium">
                    {formatPrice(line.product.price * line.qty)}
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-3 text-sm border-t border-border pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">Free shipping on orders over ₵100</p>
              )}
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
