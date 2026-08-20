import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Edit, Trash2, Search, Filter, ChevronDown, CheckSquare, Square } from "lucide-react";
import { mockProducts } from "@/data/mock/products";
import { formatPrice, getStockStatus } from "@/data/api";
import { Modal } from "@/components/Modal";
import type { Product } from "@/data/types";
import { useState } from "react";

export const Route = createFileRoute("/admin/products")({
  head: () => ({
    meta: [
      { title: "Products — Admin Dashboard" },
      {
        name: "description",
        content: "Manage products for Vicky's Place.",
      },
    ],
  }),
  component: AdminProducts,
});

function AdminProducts() {
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    basePrice: "",
    description: "",
    image: "",
  });

  const filteredProducts = mockProducts.filter(
    (product: Product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleExpand = (productId: string) => {
    const newExpanded = new Set(expandedProducts);
    if (newExpanded.has(productId)) {
      newExpanded.delete(productId);
    } else {
      newExpanded.add(productId);
    }
    setExpandedProducts(newExpanded);
  };

  const toggleSelect = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedProducts.size === filteredProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(filteredProducts.map((p) => p.id)));
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedProducts.size} products?`)) {
      console.log("Deleting products:", Array.from(selectedProducts));
      setSelectedProducts(new Set());
    }
  };

  const handleBulkActivate = () => {
    console.log("Activating products:", Array.from(selectedProducts));
    alert(`Activated ${selectedProducts.size} products`);
    setSelectedProducts(new Set());
  };

  const handleAddProduct = () => {
    setFormData({ name: "", brand: "", category: "", basePrice: "", description: "", image: "" });
    setShowAddModal(true);
  };

  const handleEditProduct = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId);
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        brand: product.brand,
        category: product.category,
        basePrice: product.basePrice.toString(),
        description: product.description,
        image: product.image || "",
      });
      setShowEditModal(true);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      console.log("Deleting product:", productId);
    }
  };

  const handleSaveProduct = () => {
    if (showAddModal) {
      console.log("Adding product:", formData);
      alert("Product added successfully!");
      setShowAddModal(false);
    } else if (showEditModal && editingProduct) {
      console.log("Updating product:", editingProduct.id, formData);
      alert("Product updated successfully!");
      setShowEditModal(false);
      setEditingProduct(null);
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
          <h1 className="text-2xl md:text-3xl">Products</h1>
        </div>
        <button
          onClick={handleAddProduct}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-md border border-border bg-card pl-10 pr-4 text-sm outline-none focus:border-primary"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm hover:border-primary"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
        {selectedProducts.size > 0 && (
          <div className="flex items-center gap-2 rounded-md bg-primary/10 px-4 py-2">
            <span className="text-sm font-semibold text-primary">
              {selectedProducts.size} selected
            </span>
            <button onClick={handleBulkActivate} className="text-sm text-primary hover:underline">
              Activate
            </button>
            <button onClick={handleBulkDelete} className="text-sm text-red-600 hover:underline">
              Delete
            </button>
            <button
              onClick={() => setSelectedProducts(new Set())}
              className="text-sm text-muted-foreground hover:underline"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-sm font-semibold w-10">
                <button onClick={toggleSelectAll} className="p-1 hover:bg-muted rounded-md">
                  {selectedProducts.size === filteredProducts.length &&
                  filteredProducts.length > 0 ? (
                    <CheckSquare className="h-4 w-4" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Product</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Stock</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product: Product) => (
              <>
                <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleSelect(product.id)}
                      className="p-1 hover:bg-muted rounded-md"
                    >
                      {selectedProducts.has(product.id) ? (
                        <CheckSquare className="h-4 w-4" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleExpand(product.id)}
                        className="p-1 hover:bg-muted rounded-md"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            expandedProducts.has(product.id) ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-12 w-12 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm capitalize">{product.category}</td>
                  <td className="px-6 py-4 text-sm">{formatPrice(product.basePrice)}</td>
                  <td className="px-6 py-4 text-sm">
                    {product.variants.length > 0 ? (
                      <span className="text-muted-foreground">
                        {product.variants.reduce((sum, v) => sum + v.stock, 0)} total
                      </span>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditProduct(product.id)}
                        className="p-2 hover:bg-muted rounded-md"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 hover:bg-muted rounded-md text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedProducts.has(product.id) && product.variants.length > 0 && (
                  <tr key={`${product.id}-variants`}>
                    <td colSpan={7} className="px-6 py-4 bg-muted/30">
                      <div className="pl-8">
                        <p className="text-sm font-semibold mb-3">Variants</p>
                        <div className="space-y-2">
                          {product.variants.map((variant) => {
                            const stockStatus = getStockStatus(variant.stock);
                            return (
                              <div
                                key={variant.id}
                                className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
                              >
                                <div>
                                  <p className="text-sm font-semibold">{variant.label}</p>
                                  <p className="text-xs text-muted-foreground">{variant.sku}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="text-right">
                                    <p className="text-sm font-semibold">
                                      {formatPrice(variant.price)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      Stock: {variant.stock}
                                    </p>
                                  </div>
                                  <span
                                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                      stockStatus === "in-stock"
                                        ? "bg-green-100 text-green-600"
                                        : stockStatus === "low-stock"
                                          ? "bg-yellow-100 text-yellow-600"
                                          : "bg-red-100 text-red-600"
                                    }`}
                                  >
                                    {stockStatus}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Product"
        footer={
          <>
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProduct}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep"
            >
              Add Product
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Brand</label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="Enter brand"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="Enter category"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Base Price (₵)</label>
            <input
              type="number"
              value={formData.basePrice}
              onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="Enter price"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData({ ...formData, image: reader.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
            {formData.image && (
              <div className="mt-2">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-md border border-border"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full rounded-md border border-border bg-card p-4 text-sm outline-none focus:border-primary resize-y"
              placeholder="Enter product description"
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingProduct(null);
        }}
        title="Edit Product"
        footer={
          <>
            <button
              onClick={() => {
                setShowEditModal(false);
                setEditingProduct(null);
              }}
              className="px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProduct}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep"
            >
              Save Changes
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Brand</label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Base Price (₵)</label>
            <input
              type="number"
              value={formData.basePrice}
              onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData({ ...formData, image: reader.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
            {formData.image && (
              <div className="mt-2">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-md border border-border"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full rounded-md border border-border bg-card p-4 text-sm outline-none focus:border-primary resize-y"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
