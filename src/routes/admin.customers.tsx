import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Filter, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/customers")({
  head: () => ({
    meta: [
      { title: "Customers — Admin Dashboard" },
      {
        name: "description",
        content: "Manage customers for Vicky's Place.",
      },
    ],
  }),
  component: AdminCustomers,
});

function AdminCustomers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [showFilters, setShowFilters] = useState(false);

  const customers = [
    {
      id: "CUST-001",
      name: "Ama Mensah",
      email: "ama@example.com",
      phone: "+233 20 123 4567",
      location: "Accra, Ghana",
      orders: 5,
      totalSpent: "₵450",
      joined: "2024-01-10",
      status: "active" as const,
    },
    {
      id: "CUST-002",
      name: "Kofi Asante",
      email: "kofi@example.com",
      phone: "+233 24 234 5678",
      location: "Kumasi, Ghana",
      orders: 3,
      totalSpent: "₵280",
      joined: "2024-01-08",
      status: "active" as const,
    },
    {
      id: "CUST-003",
      name: "Abena Osei",
      email: "abena@example.com",
      phone: "+233 20 345 6789",
      location: "Tamale, Ghana",
      orders: 8,
      totalSpent: "₵890",
      joined: "2024-01-05",
      status: "active" as const,
    },
    {
      id: "CUST-004",
      name: "Kwame Boateng",
      email: "kwame@example.com",
      phone: "+233 24 456 7890",
      location: "Takoradi, Ghana",
      orders: 2,
      totalSpent: "₵120",
      joined: "2024-01-03",
      status: "inactive" as const,
    },
    {
      id: "CUST-005",
      name: "Efua Nkansah",
      email: "efua@example.com",
      phone: "+233 20 567 8901",
      location: "Cape Coast, Ghana",
      orders: 4,
      totalSpent: "₵520",
      joined: "2024-01-01",
      status: "active" as const,
    },
  ];

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      searchQuery === "" ||
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && customer.status === "active") ||
      (statusFilter === "inactive" && customer.status === "inactive");
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            Admin
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <h1 className="text-2xl md:text-3xl">Customers</h1>
        </div>
      </div>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search customers..."
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
        {showFilters && (
          <div className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "inactive")}
              className="bg-transparent text-sm outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        )}
      </div>

      <div className="grid gap-4">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="rounded-lg border border-border bg-card p-6 hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-semibold text-primary">
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{customer.name}</h3>
                    <p className="text-sm text-muted-foreground">{customer.id}</p>
                  </div>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {customer.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {customer.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {customer.location}
                  </div>
                  <div className="text-sm text-muted-foreground">Joined {customer.joined}</div>
                </div>
              </div>
              <div className="ml-6 text-right">
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="font-semibold">{customer.orders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="font-semibold">{customer.totalSpent}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
