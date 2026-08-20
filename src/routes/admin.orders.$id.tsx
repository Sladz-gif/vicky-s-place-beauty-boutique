import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { mockOrders } from "@/data/mock/orders";
import { formatPrice, logActivity } from "@/data/api";
import type { Order } from "@/data/types";
import { useState } from "react";

export const Route = createFileRoute("/admin/orders/$id")({
  component: AdminOrderDetail,
});

function AdminOrderDetail() {
  const { id } = Route.useParams();
  const [status, setStatus] = useState<Order["status"]>("pending");

  const order = mockOrders.find((o: Order) => o.id === id);

  if (!order) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Order not found</h1>
          <Link to="/admin/orders" className="text-primary hover:underline mt-4 inline-block">
            Back to orders
          </Link>
        </div>
      </div>
    );
  }

  const handleStatusChange = (newStatus: Order["status"]) => {
    setStatus(newStatus);
    // Log the status change to activity log
    logActivity({
      staffId: "admin",
      staffName: "Admin",
      action: "updated",
      entityType: "order",
      entityId: order.id,
      entityName: order.id,
      before: { status: order.status },
      after: { status: newStatus },
    });
    // In a real app, this would update the mock order data
    console.log(`Order ${order.id} status changed to ${newStatus}`);
  };

  const statusOptions: Order["status"][] = [
    "pending",
    "paid",
    "fulfilled",
    "shipped",
    "delivered",
    "returned",
    "cancelled",
  ];

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/admin/orders"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to orders
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-lg">Order Details</h3>
              <div className="flex items-center gap-2">
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(e.target.value as Order["status"])}
                  className="rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-semibold">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-semibold">{order.placedAt.split("T")[0]}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Customer</p>
                <p className="font-semibold">{order.customerName || "Guest"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold">{order.customerEmail || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-semibold">{order.customerPhone || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-semibold capitalize">{order.paymentMethod.replace("_", " ")}</p>
              </div>
            </div>

            {order.shippingAddress && (
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-2">Shipping Address</p>
                <div className="rounded-lg bg-muted/30 p-4">
                  <p className="font-semibold">{order.shippingAddress.label}</p>
                  <p className="text-sm">
                    {order.shippingAddress.region}, {order.shippingAddress.city}
                  </p>
                  <p className="text-sm">{order.shippingAddress.digitalGpsAddress}</p>
                  <p className="text-sm">{order.shippingAddress.landmark}</p>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-serif text-lg mb-6">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4 border-b border-border last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-semibold">{item.productName}</p>
                    <p className="text-sm text-muted-foreground">{item.variantLabel}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.qty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(item.priceAtPurchase * item.qty)}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(item.priceAtPurchase)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-serif text-lg mb-6">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-semibold text-green-600">
                    -{formatPrice(order.discount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-semibold">{formatPrice(order.deliveryFee)}</span>
              </div>
              {order.discountCode && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount Code</span>
                  <span className="font-semibold">{order.discountCode}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t border-border">
                <span className="font-bold">Total</span>
                <span className="font-bold text-lg">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-serif text-lg mb-4">Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm hover:border-primary">
                <Edit className="h-4 w-4" />
                Edit Order
              </button>
              <button className="w-full flex items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm hover:border-red-500 text-red-600">
                <Trash2 className="h-4 w-4" />
                Delete Order
              </button>
            </div>
          </div>

          {order.notes && (
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-serif text-lg mb-4">Notes</h3>
              <p className="text-sm text-muted-foreground">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
