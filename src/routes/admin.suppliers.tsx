import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Edit, Trash2, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Modal } from "@/components/Modal";
import type { Supplier } from "@/data/types";
import { useState } from "react";

const mockSuppliers: Supplier[] = [
  {
    id: "SUP-001",
    name: "Ghana Beauty Supplies Ltd",
    contactPerson: "Kwame Mensah",
    email: "kwame@ghanabeauty.com",
    phone: "+233 20 123 4567",
    address: "Accra Industrial Area, Ghana",
    paymentTerms: "Net 30",
    leadTime: 7,
    active: true,
    createdAt: "2024-01-15",
  },
  {
    id: "SUP-002",
    name: "West African Cosmetics",
    contactPerson: "Ama Asante",
    email: "ama@wacosmetics.com",
    phone: "+233 24 234 5678",
    address: "Kumasi, Ghana",
    paymentTerms: "Net 15",
    leadTime: 5,
    active: true,
    createdAt: "2024-02-20",
  },
  {
    id: "SUP-003",
    name: "Global Hair Products",
    contactPerson: "John Doe",
    email: "john@globalhair.com",
    phone: "+233 50 345 6789",
    address: "Tema, Ghana",
    paymentTerms: "COD",
    leadTime: 3,
    active: false,
    createdAt: "2024-03-10",
  },
];

export const Route = createFileRoute("/admin/suppliers")({
  head: () => ({
    meta: [
      { title: "Suppliers — Admin Dashboard" },
      {
        name: "description",
        content: "Manage suppliers for Vicky's Place.",
      },
    ],
  }),
  component: AdminSuppliers,
});

function AdminSuppliers() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    paymentTerms: "",
    leadTime: "",
  });

  const handleAddSupplier = () => {
    setFormData({
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      paymentTerms: "",
      leadTime: "",
    });
    setShowAddModal(true);
  };

  const handleEditSupplier = (supplierId: string) => {
    const supplier = mockSuppliers.find((s) => s.id === supplierId);
    if (supplier) {
      setEditingSupplier(supplier);
      setFormData({
        name: supplier.name,
        contactPerson: supplier.contactPerson,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        paymentTerms: supplier.paymentTerms,
        leadTime: supplier.leadTime.toString(),
      });
      setShowEditModal(true);
    }
  };

  const handleDeleteSupplier = (supplierId: string) => {
    if (confirm("Are you sure you want to delete this supplier?")) {
      console.log("Deleting supplier:", supplierId);
    }
  };

  const handleSaveSupplier = () => {
    if (showAddModal) {
      console.log("Adding supplier:", formData);
      alert("Supplier added successfully!");
      setShowAddModal(false);
    } else if (showEditModal && editingSupplier) {
      console.log("Updating supplier:", editingSupplier.id, formData);
      alert("Supplier updated successfully!");
      setShowEditModal(false);
      setEditingSupplier(null);
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
          <h1 className="text-2xl md:text-3xl">Suppliers</h1>
        </div>
        <button
          onClick={handleAddSupplier}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
        >
          <Plus className="h-4 w-4" />
          Add Supplier
        </button>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
          {mockSuppliers.map((supplier: Supplier) => (
            <div
              key={supplier.id}
              className="rounded-lg border border-border bg-card p-6 hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{supplier.name}</h3>
                  <p className="text-sm text-muted-foreground">{supplier.id}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditSupplier(supplier.id)}
                    className="p-2 hover:bg-muted rounded-md"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteSupplier(supplier.id)}
                    className="p-2 hover:bg-muted rounded-md text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{supplier.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{supplier.email}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{supplier.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Lead time: {supplier.leadTime} days</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    Payment: {supplier.paymentTerms}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      supplier.active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {supplier.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Supplier"
        footer={
          <>
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSupplier}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep"
            >
              Add Supplier
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Company Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="Enter company name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Contact Person</label>
            <input
              type="text"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="Enter contact name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="Enter address"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Payment Terms</label>
            <input
              type="text"
              value={formData.paymentTerms}
              onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="e.g., Net 30, COD"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Lead Time (days)</label>
            <input
              type="number"
              value={formData.leadTime}
              onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="Enter lead time in days"
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingSupplier(null);
        }}
        title="Edit Supplier"
        footer={
          <>
            <button
              onClick={() => {
                setShowEditModal(false);
                setEditingSupplier(null);
              }}
              className="px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSupplier}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep"
            >
              Save Changes
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Company Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Contact Person</label>
            <input
              type="text"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Payment Terms</label>
            <input
              type="text"
              value={formData.paymentTerms}
              onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Lead Time (days)</label>
            <input
              type="number"
              value={formData.leadTime}
              onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
