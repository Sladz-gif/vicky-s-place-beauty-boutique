import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as Plus } from "../_libs/lucide-react.mjs";
import { t as Modal } from "./Modal-fwR_rBs9.mjs";
import { S as mockStaff } from "./router-DsJhwsz_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.ops.tasks-BZVwYZKG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var mockTasks = [
	{
		id: "task-1",
		title: "Restock CeraVe Hydrating Cleanser",
		assignedTo: "staff-2",
		status: "todo",
		dueDate: "2024-04-01T00:00:00Z",
		createdAt: "2024-03-25T00:00:00Z"
	},
	{
		id: "task-2",
		title: "Follow up with pending orders",
		assignedTo: "staff-2",
		status: "doing",
		dueDate: "2024-03-29T00:00:00Z",
		createdAt: "2024-03-27T00:00:00Z"
	},
	{
		id: "task-3",
		title: "Prepare monthly financial report",
		assignedTo: "staff-3",
		status: "todo",
		dueDate: "2024-04-05T00:00:00Z",
		createdAt: "2024-03-28T00:00:00Z"
	},
	{
		id: "task-4",
		title: "Update product descriptions",
		assignedTo: "staff-4",
		status: "done",
		dueDate: "2024-03-25T00:00:00Z",
		createdAt: "2024-03-20T00:00:00Z"
	},
	{
		id: "task-5",
		title: "Review pending customer reviews",
		assignedTo: "staff-1",
		status: "todo",
		dueDate: "2024-03-30T00:00:00Z",
		createdAt: "2024-03-26T00:00:00Z"
	},
	{
		id: "task-6",
		title: "Schedule social media posts",
		assignedTo: "staff-4",
		status: "doing",
		dueDate: "2024-03-31T00:00:00Z",
		createdAt: "2024-03-27T00:00:00Z"
	}
];
var mockShifts = [{
	id: "SHIFT-001",
	staffId: "STAFF-001",
	staffName: "Sarah Johnson",
	date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
	startTime: "09:00",
	endTime: "17:00",
	actualStartTime: "09:05",
	actualEndTime: null,
	status: "clocked_in",
	salesAmount: 1250
}, {
	id: "SHIFT-002",
	staffId: "STAFF-002",
	staffName: "Kwame Mensah",
	date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
	startTime: "10:00",
	endTime: "18:00",
	actualStartTime: null,
	actualEndTime: null,
	status: "scheduled"
}];
var mockStaffSchedules = [
	{
		id: "SCHED-001",
		staffId: "STAFF-001",
		dayOfWeek: 1,
		startTime: "09:00",
		endTime: "17:00",
		breakStart: "12:00",
		breakEnd: "13:00"
	},
	{
		id: "SCHED-002",
		staffId: "STAFF-001",
		dayOfWeek: 2,
		startTime: "09:00",
		endTime: "17:00",
		breakStart: "12:00",
		breakEnd: "13:00"
	},
	{
		id: "SCHED-003",
		staffId: "STAFF-002",
		dayOfWeek: 1,
		startTime: "10:00",
		endTime: "18:00",
		breakStart: "13:00",
		breakEnd: "14:00"
	}
];
function AdminTasks() {
	const [view, setView] = (0, import_react.useState)("tasks");
	const [showAddModal, setShowAddModal] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		title: "",
		description: "",
		priority: "medium",
		assignee: "",
		dueDate: ""
	});
	const todoTasks = mockTasks.filter((t) => t.status === "todo");
	const doingTasks = mockTasks.filter((t) => t.status === "doing");
	const doneTasks = mockTasks.filter((t) => t.status === "done");
	const handleAddTask = () => {
		setFormData({
			title: "",
			description: "",
			priority: "medium",
			assignee: "",
			dueDate: ""
		});
		setShowAddModal(true);
	};
	const handleSaveTask = () => {
		console.log("Adding task:", formData);
		alert("Task added successfully!");
		setShowAddModal(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4 lg:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin",
						className: "text-sm text-muted-foreground hover:text-foreground",
						children: "Admin"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-2 text-muted-foreground",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/ops/tasks",
						className: "text-sm text-muted-foreground hover:text-foreground",
						children: "Ops"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-2 text-muted-foreground",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl md:text-3xl",
						children: "Tasks & Scheduling"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-md border border-border bg-card p-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setView("tasks"),
								className: `px-4 py-2 rounded-md text-sm ${view === "tasks" ? "bg-muted" : "hover:bg-muted/50"}`,
								children: "Tasks"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setView("shifts"),
								className: `px-4 py-2 rounded-md text-sm ${view === "shifts" ? "bg-muted" : "hover:bg-muted/50"}`,
								children: "Shifts"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setView("schedule"),
								className: `px-4 py-2 rounded-md text-sm ${view === "schedule" ? "bg-muted" : "hover:bg-muted/50"}`,
								children: "Schedule"
							})
						]
					}), view === "tasks" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleAddTask,
						className: "flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Add Task"]
					})]
				})]
			}),
			view === "tasks" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskColumn, {
						title: "To Do",
						tasks: todoTasks,
						status: "todo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskColumn, {
						title: "In Progress",
						tasks: doingTasks,
						status: "doing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskColumn, {
						title: "Done",
						tasks: doneTasks,
						status: "done"
					})
				]
			}),
			view === "shifts" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-border px-6 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-serif text-lg",
						children: "Today's Shifts"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Staff"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Scheduled"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Actual"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-right text-sm font-semibold",
								children: "Sales"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: mockShifts.map((shift) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border hover:bg-muted/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 font-semibold",
								children: shift.staffName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 text-sm",
								children: shift.date
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-6 py-4 text-sm",
								children: [
									shift.startTime,
									" - ",
									shift.endTime
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 text-sm",
								children: shift.actualStartTime ? `${shift.actualStartTime} - ${shift.actualEndTime || "Active"}` : "-"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-full px-3 py-1 text-xs font-semibold ${shift.status === "clocked_in" ? "bg-green-100 text-green-600" : shift.status === "clocked_out" ? "bg-blue-100 text-blue-600" : shift.status === "missed" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"}`,
									children: shift.status.replace("_", " ").toUpperCase()
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 text-right font-semibold",
								children: shift.salesAmount ? `₵${shift.salesAmount.toFixed(2)}` : "-"
							})
						]
					}, shift.id)) })]
				})]
			}),
			view === "schedule" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-border px-6 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-serif text-lg",
						children: "Staff Schedule"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Staff"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Day"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Start Time"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "End Time"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Break"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: mockStaffSchedules.map((schedule) => {
						const staff = mockStaff.find((s) => s.id === schedule.staffId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border hover:bg-muted/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 font-semibold",
									children: staff?.name || "Unknown"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-sm",
									children: [
										"Sunday",
										"Monday",
										"Tuesday",
										"Wednesday",
										"Thursday",
										"Friday",
										"Saturday"
									][schedule.dayOfWeek]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-sm",
									children: schedule.startTime
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-sm",
									children: schedule.endTime
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-sm",
									children: schedule.breakStart && schedule.breakEnd ? `${schedule.breakStart} - ${schedule.breakEnd}` : "-"
								})
							]
						}, schedule.id);
					}) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				isOpen: showAddModal,
				onClose: () => setShowAddModal(false),
				title: "Add New Task",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setShowAddModal(false),
					className: "px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleSaveTask,
					className: "px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep",
					children: "Add Task"
				})] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Task Title"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: formData.title,
							onChange: (e) => setFormData({
								...formData,
								title: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
							placeholder: "Enter task title"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: formData.description,
							onChange: (e) => setFormData({
								...formData,
								description: e.target.value
							}),
							rows: 3,
							className: "w-full rounded-md border border-border bg-card p-4 text-sm outline-none focus:border-primary resize-y",
							placeholder: "Enter task description"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Priority"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: formData.priority,
							onChange: (e) => setFormData({
								...formData,
								priority: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "low",
									children: "Low"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "medium",
									children: "Medium"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "high",
									children: "High"
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Assignee"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: formData.assignee,
							onChange: (e) => setFormData({
								...formData,
								assignee: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
							placeholder: "Enter assignee name"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Due Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: formData.dueDate,
							onChange: (e) => setFormData({
								...formData,
								dueDate: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
						})] })
					]
				})
			})
		]
	});
}
function TaskColumn({ title, tasks, status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-serif text-lg",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full bg-muted px-2 py-1 text-xs font-semibold",
				children: tasks.length
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [tasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-muted/30 p-4 hover:border-primary transition-colors cursor-pointer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-semibold",
						children: task.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: ["Due: ", task.dueDate]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: ["Assigned to: ", task.assignedTo]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "text-xs rounded border border-border bg-background px-2 py-1",
							defaultValue: status,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "todo",
									children: "To Do"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "doing",
									children: "In Progress"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "done",
									children: "Done"
								})
							]
						})]
					})
				]
			}, task.id)), tasks.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg border-2 border-dashed border-border p-8 text-center text-muted-foreground",
				children: "No tasks"
			})]
		})]
	});
}
//#endregion
export { AdminTasks as component };
