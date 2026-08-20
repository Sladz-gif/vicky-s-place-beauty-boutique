import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { categories } from "@/data/products";
import { Modal } from "@/components/Modal";
import { useState } from "react";

export const Route = createFileRoute("/admin/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Admin Dashboard" },
      {
        name: "description",
        content: "Manage categories for Vicky's Place.",
      },
    ],
  }),
  component: AdminCategories,
});

function AdminCategories() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{
    name: string;
    slug: string;
    image: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: "",
  });

  const handleAddCategory = () => {
    setFormData({ name: "", slug: "", image: "" });
    setShowAddModal(true);
  };

  const handleEditCategory = (categorySlug: string) => {
    const category = categories.find((c) => c.slug === categorySlug);
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug,
        image: category.image,
      });
      setShowEditModal(true);
    }
  };

  const handleDeleteCategory = (categorySlug: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      console.log("Deleting category:", categorySlug);
    }
  };

  const handleSaveCategory = () => {
    if (showAddModal) {
      console.log("Adding category:", formData);
      alert("Category added successfully!");
      setShowAddModal(false);
    } else if (showEditModal && editingCategory) {
      console.log("Updating category:", editingCategory.slug, formData);
      alert("Category updated successfully!");
      setShowEditModal(false);
      setEditingCategory(null);
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
          <h1 className="text-2xl md:text-3xl">Categories</h1>
        </div>
        <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((category, index) => (
          <div
            key={category.slug}
            className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
          >
            <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
            <img
              src={category.image}
              alt={category.name}
              className="h-16 w-16 rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.slug}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEditCategory(category.slug)}
                className="p-2 hover:bg-muted rounded-md"
                title="Edit"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDeleteCategory(category.slug)}
                className="p-2 hover:bg-muted rounded-md text-red-600"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Category"
        footer={
          <>
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveCategory}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep"
            >
              Add Category
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Category Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="Enter category name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="category-slug"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingCategory(null);
        }}
        title="Edit Category"
        footer={
          <>
            <button
              onClick={() => {
                setShowEditModal(false);
                setEditingCategory(null);
              }}
              className="px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveCategory}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep"
            >
              Save Changes
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Category Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
