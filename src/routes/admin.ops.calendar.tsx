import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { mockCalendarEvents } from "@/data/mock/calendar";
import { AdminLayout } from "@/components/AdminLayout";
import type { CalendarEvent } from "@/data/types";

export const Route = createFileRoute("/admin/ops/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — Admin Dashboard" },
      {
        name: "description",
        content: "View calendar for Vicky's Place.",
      },
    ],
  }),
  component: AdminCalendar,
});

function AdminCalendar() {
  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            Admin
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link
            to="/admin/ops/calendar"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Ops
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <h1 className="text-2xl md:text-3xl">Calendar</h1>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep">
          <Plus className="h-4 w-4" />
          Add Event
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-serif text-lg mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {mockCalendarEvents.map((event: CalendarEvent) => (
              <div
                key={event.id}
                className="flex items-start gap-4 rounded-lg border border-border bg-muted/30 p-4 hover:border-primary transition-colors"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{event.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {event.date} at {event.time}
                  </p>
                  {event.description && (
                    <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {event.staffIds.map((staffId) => (
                      <span
                        key={staffId}
                        className="rounded-full bg-muted px-2 py-1 text-xs font-semibold"
                      >
                        {staffId}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-serif text-lg mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
              <span className="text-sm text-muted-foreground">Total Events</span>
              <span className="font-semibold">{mockCalendarEvents.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
              <span className="text-sm text-muted-foreground">This Week</span>
              <span className="font-semibold">
                {mockCalendarEvents.filter((e) => e.date.includes("2024-03")).length}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
              <span className="text-sm text-muted-foreground">Staff Involved</span>
              <span className="font-semibold">
                {new Set(mockCalendarEvents.flatMap((e) => e.staffIds)).size}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
