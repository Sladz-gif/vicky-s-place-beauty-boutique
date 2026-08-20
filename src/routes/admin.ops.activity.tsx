import { createFileRoute, Link } from "@tanstack/react-router";
import { mockActivityLog } from "@/data/mock/activityLog";
import { formatDateTime } from "@/data/api";
import { AdminLayout } from "@/components/AdminLayout";
import type { ActivityLogEntry } from "@/data/types";

export const Route = createFileRoute("/admin/ops/activity")({
  head: () => ({
    meta: [
      { title: "Activity Log — Admin Dashboard" },
      {
        name: "description",
        content: "View activity log for Vicky's Place.",
      },
    ],
  }),
  component: AdminActivity,
});

function AdminActivity() {
  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            Admin
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link
            to="/admin/ops/activity"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Ops
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <h1 className="text-2xl md:text-3xl">Activity Log</h1>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-sm font-semibold">Timestamp</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Staff</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Entity</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {mockActivityLog.map((entry: ActivityLogEntry) => (
              <tr key={entry.id} className="border-b border-border hover:bg-muted/50">
                <td className="px-6 py-4 text-sm">{formatDateTime(entry.timestamp)}</td>
                <td className="px-6 py-4 text-sm font-semibold">{entry.staffName}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary capitalize">
                    {entry.action}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div>
                    <p className="font-semibold">{entry.entityName}</p>
                    <p className="text-xs text-muted-foreground capitalize">{entry.entityType}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  {entry.before && entry.after && (
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">
                        Before: {JSON.stringify(entry.before)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        After: {JSON.stringify(entry.after)}
                      </div>
                    </div>
                  )}
                  {entry.after && !entry.before && (
                    <div className="text-xs text-muted-foreground">
                      Created: {JSON.stringify(entry.after)}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
