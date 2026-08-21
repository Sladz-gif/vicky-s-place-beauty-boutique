import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Smartphone,
  DollarSign,
  Printer,
  User,
} from "lucide-react";

import { mockProducts } from "@/data/mock/products";
import { formatPrice } from "@/data/api";
import type { Product, Variant } from "@/data/types";
import { useState } from "react";

interface CartItem {
  variant: Variant;
  product: Product;
  qty: number;
}

export const Route = createFileRoute("/admin/pos")({
  head: () => ({
    meta: [
      { title: "POS ΓÇö Admin Dashboard" },
      {
        name: "description",
        content: "Point of Sale for Vicky's Place.",
      },
    ],
  }),
  component: AdminPOS,
});

function AdminPOS() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "mtn_momo" | "vodafone_cash" | "airteltigo_money"
  >("cash");
  const [amountReceived, setAmountReceived] = useState("");

  const filteredProducts = mockProducts.filter(
    (product: Product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.barcode?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.variant.priceOverride || item.product.basePrice) * item.qty,
    0,
  );
  const total = subtotal;
  const change = amountReceived ? parseFloat(amountReceived) - total : 0;

  const addToCart = (product: Product, variant: Variant) => {
    const existingItem = cart.find((item) => item.variant.id === variant.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.variant.id === variant.id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { variant, product, qty: 1 }]);
    }
  };

  const updateCartQty = (variantId: string, delta: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.variant.id === variantId) {
            const newQty = Math.max(0, item.qty + delta);
            return { ...item, qty: newQty };
          }
          return item;
        })
        .filter((item) => item.qty > 0),
    );
  };

  const removeFromCart = (variantId: string) => {
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

    console.log("Processing sale:", {
      items: cart,
      customer: { name: customerName, phone: customerPhone },
      paymentMethod,
      total,
      amountReceived: paymentMethod === "cash" ? parseFloat(amountReceived) : total,
      change: paymentMethod === "cash" ? change : 0,
    });
    alert("Sale completed successfully!");
    setCart([]);
    setCustomerName("");
    setCustomerPhone("");
    setAmountReceived("");
    setPaymentMethod("cash");
  };

  const handlePrintReceipt = () => {
    console.log("Printing receipt for sale:", {
      items: cart,
      customer: { name: customerName, phone: customerPhone },
      paymentMethod,
      total,
    });
    alert("Receipt printed!");
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            Admin
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <h1 className="text-2xl md:text-3xl">Point of Sale</h1>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_450px] h-[calc(100vh-180px)]">
        {/* Product Selection */}
        <div className="flex flex-col gap-6 overflow-hidden">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, SKU, or scan barcode..."
              className="h-14 w-full rounded-lg border border-border bg-card pl-12 pr-4 text-base outline-none focus:border-primary"
              autoFocus
            />
          </div>

          <div className="flex-1 overflow-y-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-2 pb-6">
            {filteredProducts.map((product: Product) => (
              <div
                key={product.id}
                className="rounded-lg border border-border bg-card p-6 hover:border-primary cursor-pointer transition-colors"
              >
                <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                  {product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No image
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-base mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">SKU: {product.sku}</p>
                <p className="font-semibold text-primary text-lg">
                  {formatPrice(product.basePrice)}
                </p>
                {product.variants.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {product.variants.map((variant: Variant) => (
                      <button
                        key={variant.id}
                        onClick={() => addToCart(product, variant)}
                        disabled={variant.stockQty === 0}
                        className={`w-full text-left p-3 rounded-md text-sm border ${
                          variant.stockQty === 0
                            ? "border-border bg-muted text-muted-foreground cursor-not-allowed"
                            : "border-border hover:border-primary hover:bg-primary/5"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{variant.label}</span>
                          <span
                            className={
                              variant.stockQty <= variant.reorderPoint ? "text-red-600" : ""
                            }
                          >
                            {variant.stockQty} in stock
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {product.variants.length === 0 && (
                  <button
                    onClick={() =>
                      addToCart(product, {
                        id: product.id,
                        productId: product.id,
                        label: "Default",
                        skuSuffix: "",
                        stockQty: 0,
                        reorderPoint: 0,
                      })
                    }
                    className="w-full mt-3 p-2 rounded-md text-xs border border-border hover:border-primary hover:bg-primary/5"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="rounded-lg border border-border bg-card flex flex-col h-full overflow-hidden">
          <div className="p-6 border-b border-border flex-shrink-0">
            <h2 className="font-serif text-xl">Current Sale</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6 min-h-0">
            {cart.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Cart is empty
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.variant.id}
                    className="flex items-center gap-4 p-5 bg-muted/30 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base truncate">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">{item.variant.label}</p>
                      <p className="text-base font-semibold mt-2">
                        {formatPrice(item.variant.priceOverride || item.product.basePrice)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateCartQty(item.variant.id, -1)}
                        className="p-2 hover:bg-muted rounded-md"
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                      <span className="w-12 text-center font-semibold text-lg">{item.qty}</span>
                      <button
                        onClick={() => updateCartQty(item.variant.id, 1)}
                        className="p-2 hover:bg-muted rounded-md"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.variant.id)}
                      className="p-2 hover:bg-muted rounded-md text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-border flex-shrink-0">
            <div className="p-6 space-y-5 overflow-y-auto max-h-[300px]">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Customer name (optional)"
                    className="flex-1 h-10 rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Phone number (optional)"
                    className="flex-1 h-10 rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-semibold text-2xl">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-base font-semibold">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "cash", icon: DollarSign, label: "Cash" },
                    { value: "mtn_momo", icon: Smartphone, label: "MTN MoMo" },
                    { value: "vodafone_cash", icon: Smartphone, label: "Vodafone" },
                    { value: "airteltigo_money", icon: Smartphone, label: "AirtelTigo" },
                  ].map((method) => (
                    <button
                      key={method.value}
                      onClick={() => {
                        setPaymentMethod(
                          method.value as
                            "cash" | "mtn_momo" | "vodafone_cash" | "airteltigo_money",
                        );
                      }}
                      className={`flex flex-col items-center gap-2 p-3 rounded-md border text-sm ${
                        paymentMethod === method.value
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      <method.icon className="h-6 w-6" />
                      <span>{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {paymentMethod === "cash" && (
                <div>
                  <label className="block text-base font-semibold mb-3">Amount Received</label>
                  <input
                    type="number"
                    value={amountReceived}
                    onChange={(e) => setAmountReceived(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full h-12 rounded-md border border-border bg-card px-4 text-base outline-none focus:border-primary"
                  />
                  {amountReceived && parseFloat(amountReceived) >= total && (
                    <div className="mt-3 text-base">
                      <span className="text-muted-foreground">Change: </span>
                      <span className="font-semibold text-green-600 text-lg">
                        {formatPrice(change)}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-deep disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Sale
              </button>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={handlePrintReceipt}
                className="w-full flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-base hover:bg-muted"
              >
                <Printer className="h-5 w-5" />
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
