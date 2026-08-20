import type { Task } from "../types";

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Restock CeraVe Hydrating Cleanser",
    assignedTo: "staff-2",
    status: "todo",
    dueDate: "2024-04-01T00:00:00Z",
    createdAt: "2024-03-25T00:00:00Z",
  },
  {
    id: "task-2",
    title: "Follow up with pending orders",
    assignedTo: "staff-2",
    status: "doing",
    dueDate: "2024-03-29T00:00:00Z",
    createdAt: "2024-03-27T00:00:00Z",
  },
  {
    id: "task-3",
    title: "Prepare monthly financial report",
    assignedTo: "staff-3",
    status: "todo",
    dueDate: "2024-04-05T00:00:00Z",
    createdAt: "2024-03-28T00:00:00Z",
  },
  {
    id: "task-4",
    title: "Update product descriptions",
    assignedTo: "staff-4",
    status: "done",
    dueDate: "2024-03-25T00:00:00Z",
    createdAt: "2024-03-20T00:00:00Z",
  },
  {
    id: "task-5",
    title: "Review pending customer reviews",
    assignedTo: "staff-1",
    status: "todo",
    dueDate: "2024-03-30T00:00:00Z",
    createdAt: "2024-03-26T00:00:00Z",
  },
  {
    id: "task-6",
    title: "Schedule social media posts",
    assignedTo: "staff-4",
    status: "doing",
    dueDate: "2024-03-31T00:00:00Z",
    createdAt: "2024-03-27T00:00:00Z",
  },
];
