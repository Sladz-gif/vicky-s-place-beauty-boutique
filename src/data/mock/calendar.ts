import type { CalendarEvent } from "../types";

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "cal-1",
    title: "Staff Meeting",
    date: "2024-03-29",
    time: "10:00",
    staffIds: ["staff-1", "staff-2", "staff-3", "staff-4"],
    description: "Monthly team meeting to discuss performance and goals",
    createdAt: "2024-03-20T00:00:00Z",
  },
  {
    id: "cal-2",
    title: "Inventory Count",
    date: "2024-04-01",
    time: "09:00",
    staffIds: ["staff-2", "staff-4"],
    description: "Quarterly inventory audit",
    createdAt: "2024-03-25T00:00:00Z",
  },
  {
    id: "cal-3",
    title: "Supplier Meeting",
    date: "2024-04-03",
    time: "14:00",
    staffIds: ["staff-1"],
    description: "Meeting with CeraVe distributor",
    createdAt: "2024-03-26T00:00:00Z",
  },
  {
    id: "cal-4",
    title: "Financial Review",
    date: "2024-04-05",
    time: "11:00",
    staffIds: ["staff-1", "staff-3"],
    description: "Review Q1 financial performance",
    createdAt: "2024-03-27T00:00:00Z",
  },
];
