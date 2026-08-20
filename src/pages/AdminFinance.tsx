import {
  TrendingUp,
  DollarSign,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

function AdminFinance() {
  const stats = [
    {
      label: "Total Revenue",
      value: "₵12,450",
      change: "+12.5%",
      icon: DollarSign,
      positive: true,
    },
    {
      label: "Expenses",
      value: "₵3,280",
      change: "+5.2%",
      icon: ArrowDownRight,
      positive: false,
    },
    {
      label: "Profit",
      value: "₵9,170",
      change: "+18.3%",
      icon: TrendingUp,
      positive: true,
    },
    {
      label: "Pending",
      value: "₵1,450",
      change: "-2.1%",
      icon: CreditCard,
      positive: false,
    },
  ];

  const transactions = [
    {
      id: "TXN-001",
      type: "Sale",
      amount: "₵450",
      date: "2024-01-15",
      status: "Completed",
    },
    {
      id: "TXN-002",
      type: "Refund",
      amount: "-₵120",
      date: "2024-01-15",
      status: "Processed",
    },
    {
      id: "TXN-003",
      type: "Sale",
      amount: "₵320",
      date: "2024-01-14",
      status: "Completed",
    },
    {
      id: "TXN-004",
      type: "Sale",
      amount: "₵520",
      date: "2024-01-14",
      status: "Pending",
    },
    {
      id: "TXN-005",
      type: "Expense",
      amount: "-₵180",
      date: "2024-01-13",
      status: "Completed",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold">Finance</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <Icon
                  className={`h-4 w-4 ${stat.positive ? "text-green-600" : "text-red-600"}`}
                />
              </div>
              <p className="mt-2 text-2xl font-bold">{stat.value}</p>
              <p
                className={`mt-1 text-xs ${stat.positive ? "text-green-600" : "text-red-600"}`}
              >
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <div className="mt-4 space-y-4">
          {transactions.map((txn) => (
            <div
              key={txn.id}
              className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
            >
              <div>
                <p className="font-medium">{txn.id}</p>
                <p className="text-sm text-muted-foreground">
                  {txn.type} • {txn.date}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`font-medium ${txn.amount.startsWith("-") ? "text-red-600" : "text-green-600"}`}
                >
                  {txn.amount}
                </p>
                <p className="text-sm text-muted-foreground">{txn.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminFinance;
