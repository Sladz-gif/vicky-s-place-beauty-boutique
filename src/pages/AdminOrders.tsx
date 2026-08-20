import { Search, Eye, Package, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function AdminOrders() {
  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "2024-01-15",
      total: "₵450",
      status: "Completed",
      items: 3,
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      date: "2024-01-15",
      total: "₵320",
      status: "Processing",
      items: 2,
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      date: "2024-01-14",
      total: "₵180",
      status: "Pending",
      items: 1,
    },
    {
      id: "ORD-004",
      customer: "Alice Brown",
      date: "2024-01-14",
      total: "₵520",
      status: "Completed",
      items: 4,
    },
    {
      id: "ORD-005",
      customer: "Charlie Wilson",
      date: "2024-01-13",
      total: "₵290",
      status: "Processing",
      items: 2,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold">Orders</h1>

      <div className="mt-8">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search orders..." className="pl-10" />
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {order.date}
                  </td>
                  <td className="px-6 py-4">{order.items}</td>
                  <td className="px-6 py-4">{order.total}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Package className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
