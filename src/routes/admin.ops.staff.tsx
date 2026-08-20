import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Edit, Trash2 } from "lucide-react";
import { mockStaff } from "@/data/mock/staff";
import { Modal } from "@/components/Modal";
import type { Staff } from "@/data/types";
import { useState } from "react";

export const Route = createFileRoute("/admin/ops/staff")({
  head: () => ({
    meta: [
      { title: "Staff — Admin Dashboard" },
      {
        name: "description",
        content: "Manage staff for Vicky's Place.",
      },
    ],
  }),
  component: AdminStaff,
});

function AdminStaff() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "staff" as "admin" | "manager" | "staff",
    moduleAccess: [] as Staff["moduleAccess"],
    status: "active" as "active" | "inactive",
  });

  const handleAddStaff = () => {
    setFormData({
      name: "",
      email: "",
      role: "staff",
      moduleAccess: [],
      status: "active",
    });
    setShowAddModal(true);
  };

  const handleSaveStaff = () => {
    console.log("Adding staff:", formData);
    alert("Staff member added successfully!");
    setShowAddModal(false);
  };

  const handleEditStaff = (staffId: string) => {
    alert(`Edit staff ${staffId}`);
  };

  const handleDeleteStaff = (staffId: string) => {
    if (confirm("Are you sure you want to delete this staff member?")) {
      console.log("Deleting staff:", staffId);
    }
  };

  const toggleModuleAccess = (module: Staff["moduleAccess"][number]) => {
    setFormData({
      ...formData,
      moduleAccess: formData.moduleAccess.includes(module)
        ? formData.moduleAccess.filter((m) => m !== module)
        : [...formData.moduleAccess, module],
    });
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            Admin
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link
            to="/admin/ops/staff"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Ops
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <h1 className="text-2xl md:text-3xl">Staff</h1>
        </div>
        <button
          onClick={handleAddStaff}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
        >
          <Plus className="h-4 w-4" />
          Add Staff
        </button>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Module Access</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockStaff.map((staffMember: Staff) => (
              <tr key={staffMember.id} className="border-b border-border hover:bg-muted/50">
                <td className="px-6 py-4 font-semibold">{staffMember.name}</td>
                <td className="px-6 py-4 text-sm">{staffMember.email}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold capitalize">
                    {staffMember.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex flex-wrap gap-1">
                    {staffMember.moduleAccess.map((module) => (
                      <span
                        key={module}
                        className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary capitalize"
                      >
                        {module}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      staffMember.active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {staffMember.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEditStaff(staffMember.id)}
                      className="p-2 hover:bg-muted rounded-md"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteStaff(staffMember.id)}
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
        title="Add New Staff Member"
        footer={
          <>
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveStaff}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep"
            >
              Add Staff
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="Enter full name"
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
            <label className="block text-sm font-semibold mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value as "admin" | "manager" | "staff" })
              }
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            >
              <option value="staff">Staff</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Module Access</label>
            <div className="space-y-2">
              {["products", "orders", "customers", "finance", "ops"].map((module) => (
                <label key={module} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.moduleAccess.includes(
                      module as Staff["moduleAccess"][number],
                    )}
                    onChange={() => toggleModuleAccess(module as Staff["moduleAccess"][number])}
                    className="rounded border-border"
                  />
                  <span className="text-sm capitalize">{module}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as "active" | "inactive" })
              }
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
