import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as ChevronLeft, S as Plus, W as Clock, Z as Calendar, q as ChevronRight, r as Users } from "../_libs/lucide-react.mjs";
import { a as startOfMonth, c as isSameDay, i as format, l as addMonths, n as isToday, o as eachDayOfInterval, r as isSameMonth, s as endOfMonth, t as subMonths } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.ops.calendar-Cpnqfcvk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var mockCalendarEvents = [
	{
		id: "cal-1",
		title: "Staff Meeting",
		date: "2024-03-29",
		time: "10:00",
		staffIds: [
			"staff-1",
			"staff-2",
			"staff-3",
			"staff-4"
		],
		description: "Monthly team meeting to discuss performance and goals",
		createdAt: "2024-03-20T00:00:00Z"
	},
	{
		id: "cal-2",
		title: "Inventory Count",
		date: "2024-04-01",
		time: "09:00",
		staffIds: ["staff-2", "staff-4"],
		description: "Quarterly inventory audit",
		createdAt: "2024-03-25T00:00:00Z"
	},
	{
		id: "cal-3",
		title: "Supplier Meeting",
		date: "2024-04-03",
		time: "14:00",
		staffIds: ["staff-1"],
		description: "Meeting with CeraVe distributor",
		createdAt: "2024-03-26T00:00:00Z"
	},
	{
		id: "cal-4",
		title: "Financial Review",
		date: "2024-04-05",
		time: "11:00",
		staffIds: ["staff-1", "staff-3"],
		description: "Review Q1 financial performance",
		createdAt: "2024-03-27T00:00:00Z"
	}
];
function AdminCalendar() {
	const [currentDate, setCurrentDate] = (0, import_react.useState)(/* @__PURE__ */ new Date());
	const [selectedDate, setSelectedDate] = (0, import_react.useState)(null);
	const monthStart = startOfMonth(currentDate);
	const monthEnd = endOfMonth(currentDate);
	const calendarDays = eachDayOfInterval({
		start: monthStart,
		end: monthEnd
	});
	const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
	const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
	const getEventsForDate = (date) => {
		const dateStr = format(date, "yyyy-MM-dd");
		return mockCalendarEvents.filter((event) => event.date === dateStr);
	};
	const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4 lg:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
					to: "/admin/ops/calendar",
					className: "text-sm text-muted-foreground hover:text-foreground",
					children: "Ops"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-2 text-muted-foreground",
					children: "/"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl md:text-3xl",
					children: "Calendar"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Add Event"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 rounded-lg border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: prevMonth,
								className: "p-2 hover:bg-muted rounded-md transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-semibold",
								children: format(currentDate, "MMMM yyyy")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: nextMonth,
								className: "p-2 hover:bg-muted rounded-md transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-7 gap-2 mb-4",
						children: [
							"Sun",
							"Mon",
							"Tue",
							"Wed",
							"Thu",
							"Fri",
							"Sat"
						].map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center text-sm font-semibold text-muted-foreground py-2",
							children: day
						}, day))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-7 gap-2",
						children: calendarDays.map((date) => {
							const events = getEventsForDate(date);
							const isSelected = selectedDate && isSameDay(date, selectedDate);
							const isCurrentMonth = isSameMonth(date, currentDate);
							const isDayToday = isToday(date);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setSelectedDate(date),
								className: `
                    aspect-square p-2 rounded-lg border transition-all hover:border-primary
                    ${isSelected ? "border-primary bg-primary/10" : "border-border"}
                    ${!isCurrentMonth ? "opacity-30" : "opacity-100"}
                    ${isDayToday ? "font-semibold" : ""}
                  `,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm",
									children: format(date, "d")
								}), events.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex gap-1 flex-wrap",
									children: [events.slice(0, 2).map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-primary" }, event.id)), events.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-muted-foreground" })]
								})]
							}, date.toISOString());
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-serif text-lg mb-4",
						children: selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"
					}),
					selectedDateEvents.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: selectedDateEvents.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg border border-border bg-muted/30 p-4 hover:border-primary transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-primary" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-semibold text-sm",
											children: event.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 flex items-center gap-2 text-xs text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: event.time })]
										}),
										event.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-xs text-muted-foreground",
											children: event.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex flex-wrap gap-1",
												children: event.staffIds.map((staffId) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded-full bg-muted px-2 py-0.5 text-xs font-semibold",
													children: staffId
												}, staffId))
											})]
										})
									]
								})]
							})
						}, event.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center text-muted-foreground py-8",
						children: selectedDate ? "No events for this date" : "Select a date to view events"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 pt-6 border-t border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-lg mb-4",
							children: "Quick Stats"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-lg bg-muted/30 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "Total Events"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-sm",
										children: mockCalendarEvents.length
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-lg bg-muted/30 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "This Month"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-sm",
										children: mockCalendarEvents.filter((e) => e.date.includes(format(currentDate, "yyyy-MM"))).length
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-lg bg-muted/30 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "Staff Involved"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-sm",
										children: new Set(mockCalendarEvents.flatMap((e) => e.staffIds)).size
									})]
								})
							]
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
export { AdminCalendar as component };
