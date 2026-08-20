import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, Phone, MapPin, Plus } from "lucide-react";
import { mockCustomers } from "@/data/mock/customers";
import { mockOrders } from "@/data/mock/orders";
import { formatPrice } from "@/data/api";
import type { Customer, Order } from "@/data/types";
import { useState } from "react";

export const Route = createFileRoute("/admin/customers/$id")({
  component: AdminCustomerDetail,
});

function AdminCustomerDetail() {
  const { id } = Route.useParams();
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<string[]>([
    "First purchase - great customer!",
    "Asked about product availability",
  ]);

  const customer = mockCustomers.find((c: Customer) => c.id === id);

  if (!customer) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Customer not found</h1>
          <Link to="/admin/customers" className="text-primary hover:underline mt-4 inline-block">
            Back to customers
          </Link>
        </div>
      </div>
    );
  }

  const customerOrders = mockOrders.filter((o: Order) => o.customerId === id);
  const lifetimeValue = customerOrders.reduce((sum: number, order: Order) => sum + order.total, 0);

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote]);
      setNewNote("");
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/admin/customers"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to customers
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-serif text-lg mb-6">Customer Information</h3>
            <div className="flex items-start gap-6 mb-6">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-semibold text-primary">
                  {customer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold">{customer.name}</h2>
                <p className="text-sm text-muted-foreground">{customer.id}</p>
                <p className="text-sm text-muted-foreground">
                  Joined {customer.createdAt.split("T")[0]}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-semibold">{customer.phone}</p>
                </div>
              </div>
              {customer.addresses.length > 0 && (
                <div className="flex items-start gap-3 sm:col-span-2">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Addresses</p>
                    {customer.addresses.map((address) => (
                      <div key={address.id} className="mt-2 rounded-lg bg-muted/30 p-3">
                        <p className="font-semibold">{address.label}</p>
                        <p className="text-sm">
                          {address.region}, {address.city}
                        </p>
                        <p className="text-sm">{address.digitalGpsAddress}</p>
                        <p className="text-sm">{address.landmark}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-serif text-lg mb-6">Purchase History</h3>
            {customerOrders.length > 0 ? (
              <div className="space-y-4">
                {customerOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-4 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.placedAt.split("T")[0]}
                      </p>
                      <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatPrice(order.total)}</p>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No orders yet</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-serif text-lg mb-4">Customer Stats</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{customerOrders.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lifetime Value</p>
                <p className="text-2xl font-bold">{formatPrice(lifetimeValue)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Order Value</p>
                <p className="text-2xl font-bold">
                  {customerOrders.length > 0
                    ? formatPrice(lifetimeValue / customerOrders.length)
                    : formatPrice(0)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-serif text-lg mb-4">Notes</h3>
            <div className="space-y-3 mb-4">
              {notes.map((note, index) => (
                <div key={index} className="rounded-lg bg-muted/30 p-3 text-sm">
                  {note}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className="flex-1 h-10 rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary"
              />
              <button
                onClick={handleAddNote}
                className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
