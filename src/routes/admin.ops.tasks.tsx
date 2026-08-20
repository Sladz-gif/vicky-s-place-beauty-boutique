import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Clock, Calendar, User, CheckCircle, XCircle } from "lucide-react";
import { mockTasks } from "@/data/mock/tasks";
import { mockStaff } from "@/data/mock/staff";
import { Modal } from "@/components/Modal";
import type { Task, Shift, StaffSchedule } from "@/data/types";
import { useState } from "react";

const mockShifts: Shift[] = [
  {
    id: "SHIFT-001",
    staffId: "STAFF-001",
    staffName: "Sarah Johnson",
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "17:00",
    actualStartTime: "09:05",
    actualEndTime: null,
    status: "clocked_in",
    salesAmount: 1250,
  },
  {
    id: "SHIFT-002",
    staffId: "STAFF-002",
    staffName: "Kwame Mensah",
    date: new Date().toISOString().split("T")[0],
    startTime: "10:00",
    endTime: "18:00",
    actualStartTime: null,
    actualEndTime: null,
    status: "scheduled",
  },
];

const mockStaffSchedules: StaffSchedule[] = [
  {
    id: "SCHED-001",
    staffId: "STAFF-001",
    dayOfWeek: 1, // Monday
    startTime: "09:00",
    endTime: "17:00",
    breakStart: "12:00",
    breakEnd: "13:00",
  },
  {
    id: "SCHED-002",
    staffId: "STAFF-001",
    dayOfWeek: 2, // Tuesday
    startTime: "09:00",
    endTime: "17:00",
    breakStart: "12:00",
    breakEnd: "13:00",
  },
  {
    id: "SCHED-003",
    staffId: "STAFF-002",
    dayOfWeek: 1, // Monday
    startTime: "10:00",
    endTime: "18:00",
    breakStart: "13:00",
    breakEnd: "14:00",
  },
];

export const Route = createFileRoute("/admin/ops/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — Admin Dashboard" },
      {
        name: "description",
        content: "Manage tasks for Vicky's Place.",
      },
    ],
  }),
  component: AdminTasks,
});

function AdminTasks() {
  const [view, setView] = useState<"tasks" | "shifts" | "schedule">("tasks");
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    assignee: "",
    dueDate: "",
  });

  const todoTasks = mockTasks.filter((t: Task) => t.status === "todo");
  const doingTasks = mockTasks.filter((t: Task) => t.status === "doing");
  const doneTasks = mockTasks.filter((t: Task) => t.status === "done");

  const handleAddTask = () => {
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      assignee: "",
      dueDate: "",
    });
    setShowAddModal(true);
  };

  const handleSaveTask = () => {
    console.log("Adding task:", formData);
    alert("Task added successfully!");
    setShowAddModal(false);
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            Admin
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link
            to="/admin/ops/tasks"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Ops
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <h1 className="text-2xl md:text-3xl">Tasks & Scheduling</h1>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 rounded-md border border-border bg-card p-1">
            <button
              onClick={() => setView("tasks")}
              className={`px-4 py-2 rounded-md text-sm ${view === "tasks" ? "bg-muted" : "hover:bg-muted/50"}`}
            >
              Tasks
            </button>
            <button
              onClick={() => setView("shifts")}
              className={`px-4 py-2 rounded-md text-sm ${view === "shifts" ? "bg-muted" : "hover:bg-muted/50"}`}
            >
              Shifts
            </button>
            <button
              onClick={() => setView("schedule")}
              className={`px-4 py-2 rounded-md text-sm ${view === "schedule" ? "bg-muted" : "hover:bg-muted/50"}`}
            >
              Schedule
            </button>
          </div>
          {view === "tasks" && (
            <button
              onClick={handleAddTask}
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </button>
          )}
        </div>
      </div>

      {view === "tasks" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <TaskColumn title="To Do" tasks={todoTasks} status="todo" />
          <TaskColumn title="In Progress" tasks={doingTasks} status="doing" />
          <TaskColumn title="Done" tasks={doneTasks} status="done" />
        </div>
      )}

      {view === "shifts" && (
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border px-6 py-4">
            <h3 className="font-serif text-lg">Today's Shifts</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-semibold">Staff</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Scheduled</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actual</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Sales</th>
              </tr>
            </thead>
            <tbody>
              {mockShifts.map((shift: Shift) => (
                <tr key={shift.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-4 font-semibold">{shift.staffName}</td>
                  <td className="px-6 py-4 text-sm">{shift.date}</td>
                  <td className="px-6 py-4 text-sm">
                    {shift.startTime} - {shift.endTime}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {shift.actualStartTime
                      ? `${shift.actualStartTime} - ${shift.actualEndTime || "Active"}`
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        shift.status === "clocked_in"
                          ? "bg-green-100 text-green-600"
                          : shift.status === "clocked_out"
                            ? "bg-blue-100 text-blue-600"
                            : shift.status === "missed"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {shift.status.replace("_", " ").toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold">
                    {shift.salesAmount ? `₵${shift.salesAmount.toFixed(2)}` : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === "schedule" && (
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border px-6 py-4">
            <h3 className="font-serif text-lg">Staff Schedule</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-semibold">Staff</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Day</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Start Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">End Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Break</th>
              </tr>
            </thead>
            <tbody>
              {mockStaffSchedules.map((schedule: StaffSchedule) => {
                const staff = mockStaff.find((s) => s.id === schedule.staffId);
                const dayNames = [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ];
                return (
                  <tr key={schedule.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 font-semibold">{staff?.name || "Unknown"}</td>
                    <td className="px-6 py-4 text-sm">{dayNames[schedule.dayOfWeek]}</td>
                    <td className="px-6 py-4 text-sm">{schedule.startTime}</td>
                    <td className="px-6 py-4 text-sm">{schedule.endTime}</td>
                    <td className="px-6 py-4 text-sm">
                      {schedule.breakStart && schedule.breakEnd
                        ? `${schedule.breakStart} - ${schedule.breakEnd}`
                        : "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Task"
        footer={
          <>
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveTask}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep"
            >
              Add Task
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Task Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="Enter task title"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full rounded-md border border-border bg-card p-4 text-sm outline-none focus:border-primary resize-y"
              placeholder="Enter task description"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value as "low" | "medium" | "high" })
              }
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Assignee</label>
            <input
              type="text"
              value={formData.assignee}
              onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="Enter assignee name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

function TaskColumn({ title, tasks, status }: { title: string; tasks: Task[]; status: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-lg">{title}</h3>
        <span className="rounded-full bg-muted px-2 py-1 text-xs font-semibold">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="rounded-lg border border-border bg-muted/30 p-4 hover:border-primary transition-colors cursor-pointer"
          >
            <h4 className="font-semibold">{task.title}</h4>
            <p className="mt-2 text-sm text-muted-foreground">Due: {task.dueDate}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Assigned to: {task.assignedTo}</span>
              <select
                className="text-xs rounded border border-border bg-background px-2 py-1"
                defaultValue={status}
              >
                <option value="todo">To Do</option>
                <option value="doing">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-border p-8 text-center text-muted-foreground">
            No tasks
          </div>
        )}
      </div>
    </div>
  );
}
