import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Plus,
  Edit,
  Trash2,
  Package,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Modal } from "@/components/Modal";
import { formatPrice } from "@/data/api";
import type { PurchaseOrder, PurchaseOrderItem } from "@/data/types";
import { useState } from "react";

const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: "PO-001",
    supplierId: "SUP-001",
    supplierName: "Ghana Beauty Supplies Ltd",
    status: "ordered",
    items: [
      {
        productId: "PROD-001",
        productName: "Shea Butter Body Lotion",
        variantId: "VAR-001",
        variantLabel: "500ml",
        qty: 50,
        costPrice: 15,
        total: 750,
      },
    ],
    subtotal: 750,
    tax: 75,
    total: 825,
    orderDate: "2024-08-15",
    expectedDeliveryDate: "2024-08-22",
    notes: "Urgent order",
    createdBy: "Admin",
    createdAt: "2024-08-15",
  },
  {
    id: "PO-002",
    supplierId: "SUP-002",
    supplierName: "West African Cosmetics",
    status: "received",
    items: [
      {
        productId: "PROD-002",
        productName: "Natural Hair Shampoo",
        variantId: "VAR-002",
        variantLabel: "250ml",
        qty: 100,
        costPrice: 12,
        total: 1200,
      },
    ],
    subtotal: 1200,
    tax: 120,
    total: 1320,
    orderDate: "2024-08-10",
    expectedDeliveryDate: "2024-08-15",
    receivedDate: "2024-08-15",
    createdBy: "Admin",
    createdAt: "2024-08-10",
  },
];

export const Route = createFileRoute("/admin/purchase-orders")({
  head: () => ({
    meta: [
      { title: "Purchase Orders — Admin Dashboard" },
      {
        name: "description",
        content: "Manage purchase orders for Vicky's Place.",
      },
    ],
  }),
  component: AdminPurchaseOrders,
});

function AdminPurchaseOrders() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<PurchaseOrder | null>(null);
  const [formData, setFormData] = useState({
    supplierId: "",
    supplierName: "",
    expectedDeliveryDate: "",
    notes: "",
  });
  const [orderItems, setOrderItems] = useState<PurchaseOrderItem[]>([]);

  const handleAddOrder = () => {
    setFormData({ supplierId: "", supplierName: "", expectedDeliveryDate: "", notes: "" });
    setOrderItems([]);
    setShowAddModal(true);
  };

  const handleEditOrder = (orderId: string) => {
    const order = mockPurchaseOrders.find((o) => o.id === orderId);
    if (order) {
      setEditingOrder(order);
      setFormData({
        supplierId: order.supplierId,
        supplierName: order.supplierName,
        expectedDeliveryDate: order.expectedDeliveryDate,
        notes: order.notes || "",
      });
      setOrderItems(order.items);
      setShowEditModal(true);
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm("Are you sure you want to delete this purchase order?")) {
      console.log("Deleting purchase order:", orderId);
    }
  };

  const handleSaveOrder = () => {
    const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    if (showAddModal) {
      console.log("Adding purchase order:", {
        ...formData,
        items: orderItems,
        subtotal,
        tax,
        total,
      });
      alert("Purchase order created successfully!");
      setShowAddModal(false);
    } else if (showEditModal && editingOrder) {
      console.log("Updating purchase order:", editingOrder.id, {
        ...formData,
        items: orderItems,
        subtotal,
        tax,
        total,
      });
      alert("Purchase order updated successfully!");
      setShowEditModal(false);
      setEditingOrder(null);
    }
  };

  const addOrderItem = () => {
    setOrderItems([
      ...orderItems,
      {
        productId: "",
        productName: "",
        variantId: "",
        variantLabel: "",
        qty: 1,
        costPrice: 0,
        total: 0,
      },
    ]);
  };

  const updateOrderItem = (
    index: number,
    field: keyof PurchaseOrderItem,
    value: string | number,
  ) => {
    const updatedItems = [...orderItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    if (field === "qty" || field === "costPrice") {
      updatedItems[index].total = updatedItems[index].qty * updatedItems[index].costPrice;
    }
    setOrderItems(updatedItems);
  };

  const removeOrderItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const getStatusColor = (status: PurchaseOrder["status"]) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-600";
      case "ordered":
        return "bg-blue-100 text-blue-600";
      case "received":
        return "bg-green-100 text-green-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status: PurchaseOrder["status"]) => {
    switch (status) {
      case "draft":
        return <Clock className="h-4 w-4" />;
      case "ordered":
        return <Package className="h-4 w-4" />;
      case "received":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            Admin
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <h1 className="text-2xl md:text-3xl">Purchase Orders</h1>
        </div>
        <button
          onClick={handleAddOrder}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
        >
          <Plus className="h-4 w-4" />
          New Purchase Order
        </button>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-sm font-semibold">PO Number</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Supplier</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Order Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Expected Delivery</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">Total</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockPurchaseOrders.map((order: PurchaseOrder) => (
              <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                <td className="px-6 py-4 font-semibold">{order.id}</td>
                <td className="px-6 py-4">{order.supplierName}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}
                  >
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{order.orderDate}</td>
                <td className="px-6 py-4 text-sm">{order.expectedDeliveryDate}</td>
                <td className="px-6 py-4 text-right font-semibold">{formatPrice(order.total)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEditOrder(order.id)}
                      className="p-2 hover:bg-muted rounded-md"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="p-2 hover:bg-muted rounded-md text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="New Purchase Order"
        footer={
          <>
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveOrder}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep"
            >
              Create Order
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Supplier</label>
            <select
              value={formData.supplierId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  supplierId: e.target.value,
                  supplierName: e.target.options[e.target.selectedIndex].text,
                })
              }
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            >
              <option value="">Select supplier</option>
              <option value="SUP-001">Ghana Beauty Supplies Ltd</option>
              <option value="SUP-002">West African Cosmetics</option>
              <option value="SUP-003">Global Hair Products</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Expected Delivery Date</label>
            <input
              type="date"
              value={formData.expectedDeliveryDate}
              onChange={(e) => setFormData({ ...formData, expectedDeliveryDate: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={2}
              className="w-full rounded-md border border-border bg-card p-4 text-sm outline-none focus:border-primary resize-y"
              placeholder="Optional notes"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold">Order Items</label>
              <button onClick={addOrderItem} className="text-sm text-primary hover:underline">
                + Add Item
              </button>
            </div>
            {orderItems.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground text-sm">
                No items added yet
              </div>
            ) : (
              <div className="space-y-2">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex gap-2 items-start p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={item.productName}
                        onChange={(e) => updateOrderItem(index, "productName", e.target.value)}
                        placeholder="Product name"
                        className="h-8 w-full rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary"
                      />
                      <input
                        type="text"
                        value={item.variantLabel}
                        onChange={(e) => updateOrderItem(index, "variantLabel", e.target.value)}
                        placeholder="Variant (optional)"
                        className="h-8 w-full rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary"
                      />
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            updateOrderItem(index, "qty", parseInt(e.target.value) || 0)
                          }
                          placeholder="Qty"
                          className="h-8 w-20 rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary"
                        />
                        <input
                          type="number"
                          value={item.costPrice}
                          onChange={(e) =>
                            updateOrderItem(index, "costPrice", parseFloat(e.target.value) || 0)
                          }
                          placeholder="Cost"
                          className="h-8 w-24 rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary"
                        />
                        <div className="flex items-center text-sm font-semibold">
                          {formatPrice(item.total)}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeOrderItem(index)}
                      className="p-1 hover:bg-muted rounded-md text-red-600 mt-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {orderItems.length > 0 && (
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(orderItems.reduce((sum, item) => sum + item.total, 0))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (10%)</span>
                <span>
                  {formatPrice(orderItems.reduce((sum, item) => sum + item.total, 0) * 0.1)}
                </span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>
                  {formatPrice(orderItems.reduce((sum, item) => sum + item.total, 0) * 1.1)}
                </span>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
