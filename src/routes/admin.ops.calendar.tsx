import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Users } from "lucide-react";
import { mockCalendarEvents } from "@/data/mock/calendar";
import { AdminLayout } from "@/components/AdminLayout";
import type { CalendarEvent } from "@/data/types";
import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";

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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getEventsForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return mockCalendarEvents.filter((event) => event.date === dateStr);
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-muted rounded-md transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-muted rounded-md transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((date) => {
              const events = getEventsForDate(date);
              const isSelected = selectedDate && isSameDay(date, selectedDate);
              const isCurrentMonth = isSameMonth(date, currentDate);
              const isDayToday = isToday(date);

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={`
                    aspect-square p-2 rounded-lg border transition-all hover:border-primary
                    ${isSelected ? "border-primary bg-primary/10" : "border-border"}
                    ${!isCurrentMonth ? "opacity-30" : "opacity-100"}
                    ${isDayToday ? "font-semibold" : ""}
                  `}
                >
                  <div className="text-sm">{format(date, "d")}</div>
                  {events.length > 0 && (
                    <div className="mt-1 flex gap-1 flex-wrap">
                      {events.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className="w-1.5 h-1.5 rounded-full bg-primary"
                        />
                      ))}
                      {events.length > 2 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Events Sidebar */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-serif text-lg mb-4">
            {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
          </h3>

          {selectedDateEvents.length > 0 ? (
            <div className="space-y-4">
              {selectedDateEvents.map((event: CalendarEvent) => (
                <div
                  key={event.id}
                  className="rounded-lg border border-border bg-muted/30 p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      {event.description && (
                        <p className="mt-2 text-xs text-muted-foreground">{event.description}</p>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <div className="flex flex-wrap gap-1">
                          {event.staffIds.map((staffId) => (
                            <span
                              key={staffId}
                              className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold"
                            >
                              {staffId}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              {selectedDate ? "No events for this date" : "Select a date to view events"}
            </div>
          )}

          {/* Quick Stats */}
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="font-serif text-lg mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
                <span className="text-xs text-muted-foreground">Total Events</span>
                <span className="font-semibold text-sm">{mockCalendarEvents.length}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
                <span className="text-xs text-muted-foreground">This Month</span>
                <span className="font-semibold text-sm">
                  {mockCalendarEvents.filter((e) => e.date.includes(format(currentDate, "yyyy-MM"))).length}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
                <span className="text-xs text-muted-foreground">Staff Involved</span>
                <span className="font-semibold text-sm">
                  {new Set(mockCalendarEvents.flatMap((e) => e.staffIds)).size}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
