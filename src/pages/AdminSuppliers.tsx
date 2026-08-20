import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Building2,
  Mail,
  Phone,
  MapPin,
  RefreshCw,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function AdminSuppliers() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    paymentTerms: "Net 30",
    leadTime: 7,
    active: true,
  });

  const mockSuppliers = [
    {
      id: "sup-1",
      name: "Beauty Products Ghana Ltd",
      contactPerson: "Kwame Mensah",
      email: "kwame@beautyproductsgh.com",
      phone: "+233 24 123 4567",
      address: "123 Industrial Area, Accra",
      paymentTerms: "Net 30",
      leadTime: 7,
      active: true,
      createdAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "sup-2",
      name: "Skincare Distributors West Africa",
      contactPerson: "Ama Ofori",
      email: "ama@skincarewa.com",
      phone: "+233 20 987 6543",
      address: "456 Spintex Road, Accra",
      paymentTerms: "Net 45",
      leadTime: 14,
      active: true,
      createdAt: "2024-02-01T00:00:00Z",
    },
    {
      id: "sup-3",
      name: "Cosmetics Importers Ltd",
      contactPerson: "Kojo Asante",
      email: "kojo@cosmeticsimport.com",
      phone: "+233 55 456 7890",
      address: "789 Ring Road Central, Kumasi",
      paymentTerms: "Net 30",
      leadTime: 10,
      active: true,
      createdAt: "2024-02-15T00:00:00Z",
    },
  ];

  useEffect(() => {
    setSuppliers(mockSuppliers);
    setLoading(false);
  }, []);

  const filteredSuppliers = suppliers.filter((supplier) => {
    return (
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contactPerson
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleDeleteSupplier = () => {
    setSuppliers(suppliers.filter((s) => s.id !== selectedSupplier.id));
    setShowDeleteDialog(false);
    setSelectedSupplier(null);
  };

  const handleEditSupplier = (supplier: any) => {
    setSelectedSupplier(supplier);
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    setSuppliers(
      suppliers.map((s) =>
        s.id === selectedSupplier.id ? { ...s, ...selectedSupplier } : s,
      ),
    );
    setShowEditDialog(false);
  };

  const handleCreateSupplier = () => {
    const supplier = {
      id: `sup-${Date.now()}`,
      ...newSupplier,
      createdAt: new Date().toISOString(),
    };
    setSuppliers([...suppliers, supplier]);
    setShowCreateDialog(false);
    setNewSupplier({
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      paymentTerms: "Net 30",
      leadTime: 7,
      active: true,
    });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Suppliers</h1>
          <p className="text-muted-foreground mt-1">
            Manage supplier relationships
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setSuppliers(mockSuppliers);
                setLoading(false);
              }, 500);
            }}
            disabled={loading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{suppliers.length}</p>
                <p className="text-xs text-muted-foreground">Total Suppliers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {suppliers.filter((s) => s.active).length}
                </p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">
                  {suppliers.length > 0
                    ? Math.round(
                        suppliers.reduce((acc, s) => acc + s.leadTime, 0) /
                          suppliers.length,
                      )
                    : 0}
                  d
                </p>
                <p className="text-xs text-muted-foreground">Avg. Lead Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">
                  {new Set(suppliers.map((s) => s.paymentTerms)).size}
                </p>
                <p className="text-xs text-muted-foreground">Payment Terms</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search suppliers by name, contact person, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supplier Directory</CardTitle>
          <CardDescription>
            Showing {filteredSuppliers.length} of {suppliers.length} suppliers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading suppliers...
            </div>
          ) : filteredSuppliers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No suppliers found matching your search
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Lead Time</TableHead>
                    <TableHead>Payment Terms</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{supplier.name}</p>
                            <p className="text-xs text-muted-foreground">
                              ID: {supplier.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{supplier.contactPerson}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="truncate">{supplier.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span>{supplier.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="truncate max-w-[150px]">
                            {supplier.address}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{supplier.leadTime} days</TableCell>
                      <TableCell>
                        <Badge variant="outline">{supplier.paymentTerms}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={supplier.active ? "default" : "secondary"}
                        >
                          {supplier.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEditSupplier(supplier)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedSupplier(supplier);
                                setShowDeleteDialog(true);
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Supplier</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedSupplier?.name}"? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSupplier}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Supplier</DialogTitle>
            <DialogDescription>
              Make changes to {selectedSupplier?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedSupplier && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Company Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedSupplier.name}
                    onChange={(e) =>
                      setSelectedSupplier({
                        ...selectedSupplier,
                        name: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-contact">Contact Person</Label>
                  <Input
                    id="edit-contact"
                    value={selectedSupplier.contactPerson}
                    onChange={(e) =>
                      setSelectedSupplier({
                        ...selectedSupplier,
                        contactPerson: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={selectedSupplier.email}
                    onChange={(e) =>
                      setSelectedSupplier({
                        ...selectedSupplier,
                        email: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    value={selectedSupplier.phone}
                    onChange={(e) =>
                      setSelectedSupplier({
                        ...selectedSupplier,
                        phone: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-address">Address</Label>
                <Input
                  id="edit-address"
                  value={selectedSupplier.address}
                  onChange={(e) =>
                    setSelectedSupplier({
                      ...selectedSupplier,
                      address: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-leadTime">Lead Time (days)</Label>
                  <Input
                    id="edit-leadTime"
                    type="number"
                    value={selectedSupplier.leadTime}
                    onChange={(e) =>
                      setSelectedSupplier({
                        ...selectedSupplier,
                        leadTime: Number(e.target.value),
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-paymentTerms">Payment Terms</Label>
                  <Input
                    id="edit-paymentTerms"
                    value={selectedSupplier.paymentTerms}
                    onChange={(e) =>
                      setSelectedSupplier({
                        ...selectedSupplier,
                        paymentTerms: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowEditDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
            <DialogDescription>Create a new supplier profile</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="create-name">Company Name *</Label>
                <Input
                  id="create-name"
                  value={newSupplier.name}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, name: e.target.value })
                  }
                  className="mt-1"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <Label htmlFor="create-contact">Contact Person *</Label>
                <Input
                  id="create-contact"
                  value={newSupplier.contactPerson}
                  onChange={(e) =>
                    setNewSupplier({
                      ...newSupplier,
                      contactPerson: e.target.value,
                    })
                  }
                  className="mt-1"
                  placeholder="Enter contact person"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="create-email">Email *</Label>
                <Input
                  id="create-email"
                  type="email"
                  value={newSupplier.email}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, email: e.target.value })
                  }
                  className="mt-1"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="create-phone">Phone *</Label>
                <Input
                  id="create-phone"
                  value={newSupplier.phone}
                  onChange={(e) =>
                    setNewSupplier({ ...newSupplier, phone: e.target.value })
                  }
                  className="mt-1"
                  placeholder="+233 XX XXX XXXX"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="create-address">Address *</Label>
              <Input
                id="create-address"
                value={newSupplier.address}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, address: e.target.value })
                }
                className="mt-1"
                placeholder="Enter full address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="create-leadTime">Lead Time (days)</Label>
                <Input
                  id="create-leadTime"
                  type="number"
                  value={newSupplier.leadTime}
                  onChange={(e) =>
                    setNewSupplier({
                      ...newSupplier,
                      leadTime: Number(e.target.value),
                    })
                  }
                  className="mt-1"
                  placeholder="7"
                />
              </div>
              <div>
                <Label htmlFor="create-paymentTerms">Payment Terms</Label>
                <Input
                  id="create-paymentTerms"
                  value={newSupplier.paymentTerms}
                  onChange={(e) =>
                    setNewSupplier({
                      ...newSupplier,
                      paymentTerms: e.target.value,
                    })
                  }
                  className="mt-1"
                  placeholder="Net 30"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowCreateDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateSupplier}
                disabled={
                  !newSupplier.name ||
                  !newSupplier.contactPerson ||
                  !newSupplier.email ||
                  !newSupplier.phone ||
                  !newSupplier.address
                }
              >
                Create Supplier
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminSuppliers;
