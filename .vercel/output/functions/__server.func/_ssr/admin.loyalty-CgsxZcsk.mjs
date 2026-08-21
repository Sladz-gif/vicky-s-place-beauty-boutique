import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Gem, H as Crown, Q as Award, S as Plus, o as TrendingUp, r as Users, u as Star } from "../_libs/lucide-react.mjs";
import { t as Modal } from "./Modal-fwR_rBs9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.loyalty-CgsxZcsk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var mockLoyaltyPrograms = [{
	id: "PROG-001",
	name: "Vicky's Rewards",
	pointsPerCedi: 10,
	redemptionRate: 100,
	active: true,
	createdAt: "2024-01-01"
}];
var mockLoyaltyMembers = [
	{
		id: "MEM-001",
		customerId: "CUST-001",
		customerName: "Ama Asante",
		programId: "PROG-001",
		points: 2500,
		tier: "gold",
		joinedAt: "2024-01-15",
		lastActivityAt: "2024-08-15"
	},
	{
		id: "MEM-002",
		customerId: "CUST-002",
		customerName: "Kwame Mensah",
		programId: "PROG-001",
		points: 850,
		tier: "silver",
		joinedAt: "2024-02-20",
		lastActivityAt: "2024-08-10"
	},
	{
		id: "MEM-003",
		customerId: "CUST-003",
		customerName: "Sarah Johnson",
		programId: "PROG-001",
		points: 3200,
		tier: "platinum",
		joinedAt: "2024-01-10",
		lastActivityAt: "2024-08-18"
	},
	{
		id: "MEM-004",
		customerId: "CUST-004",
		customerName: "John Doe",
		programId: "PROG-001",
		points: 150,
		tier: "bronze",
		joinedAt: "2024-07-01",
		lastActivityAt: "2024-08-05"
	}
];
var tierConfig = {
	bronze: {
		icon: Award,
		color: "text-amber-700",
		bgColor: "bg-amber-100",
		pointsRequired: 0
	},
	silver: {
		icon: Star,
		color: "text-gray-500",
		bgColor: "bg-gray-200",
		pointsRequired: 500
	},
	gold: {
		icon: Crown,
		color: "text-yellow-600",
		bgColor: "bg-yellow-100",
		pointsRequired: 1500
	},
	platinum: {
		icon: Gem,
		color: "text-purple-600",
		bgColor: "bg-purple-100",
		pointsRequired: 3e3
	}
};
function AdminLoyalty() {
	const [view, setView] = (0, import_react.useState)("programs");
	const [showAddModal, setShowAddModal] = (0, import_react.useState)(false);
	const [showEditModal, setShowEditModal] = (0, import_react.useState)(false);
	const [showPointsModal, setShowPointsModal] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		pointsPerCedi: "",
		redemptionRate: ""
	});
	const [pointsFormData, setPointsFormData] = (0, import_react.useState)({
		memberId: "",
		customerName: "",
		pointsToAdd: "",
		note: ""
	});
	const [editingMember, setEditingMember] = (0, import_react.useState)(null);
	const handleAddProgram = () => {
		setFormData({
			name: "",
			pointsPerCedi: "",
			redemptionRate: ""
		});
		setShowAddModal(true);
	};
	const handleSaveProgram = () => {
		console.log("Adding loyalty program:", formData);
		alert("Loyalty program created successfully!");
		setShowAddModal(false);
	};
	const handleAdjustPoints = (member) => {
		setPointsFormData({
			memberId: member.id,
			customerName: member.customerName,
			pointsToAdd: "",
			note: ""
		});
		setEditingMember(member);
		setShowPointsModal(true);
	};
	const handleSavePoints = () => {
		const points = parseInt(pointsFormData.pointsToAdd) || 0;
		console.log("Adjusting points:", {
			memberId: pointsFormData.memberId,
			points,
			note: pointsFormData.note
		});
		alert(`Points ${points > 0 ? "added" : "deducted"} successfully!`);
		setShowPointsModal(false);
		setEditingMember(null);
	};
	const getTierIcon = (tier) => {
		const config = tierConfig[tier];
		const Icon = config.icon;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-5 w-5 ${config.color}` });
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl md:text-3xl",
						children: "Loyalty Program"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-md border border-border bg-card p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setView("programs"),
							className: `px-4 py-2 rounded-md text-sm ${view === "programs" ? "bg-muted" : "hover:bg-muted/50"}`,
							children: "Programs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setView("members"),
							className: `px-4 py-2 rounded-md text-sm ${view === "members" ? "bg-muted" : "hover:bg-muted/50"}`,
							children: "Members"
						})]
					}), view === "programs" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleAddProgram,
						className: "flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "New Program"]
					})]
				})]
			}),
			view === "programs" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Total Members"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-2xl font-semibold",
							children: mockLoyaltyMembers.length
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-5 w-5 text-yellow-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Points Issued"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-2xl font-semibold",
							children: mockLoyaltyMembers.reduce((sum, m) => sum + m.points, 0).toLocaleString()
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-green-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Active Programs"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-2xl font-semibold",
							children: mockLoyaltyPrograms.filter((p) => p.active).length
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-5 w-5 text-purple-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Redemption Rate"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-2xl font-semibold",
							children: mockLoyaltyPrograms[0] ? `${mockLoyaltyPrograms[0].redemptionRate} pts = ₵1` : "-"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-border px-6 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-serif text-lg",
						children: "Loyalty Programs"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6",
					children: mockLoyaltyPrograms.map((program) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-6 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-lg",
								children: program.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: ["ID: ", program.id]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded-full px-3 py-1 text-xs font-semibold ${program.active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`,
								children: program.active ? "Active" : "Inactive"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Points per ₵1"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-semibold",
									children: [program.pointsPerCedi, " points"]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Redemption Rate"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-semibold",
									children: [program.redemptionRate, " points = ₵1"]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Members"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: mockLoyaltyMembers.filter((m) => m.programId === program.id).length
								})] })
							]
						})]
					}, program.id))
				})]
			})] }),
			view === "members" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-border px-6 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-serif text-lg",
						children: "Loyalty Members"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Customer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Tier"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Points"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Joined"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left text-sm font-semibold",
								children: "Last Activity"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-right text-sm font-semibold",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: mockLoyaltyMembers.map((member) => {
						const config = tierConfig[member.tier];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border hover:bg-muted/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 font-semibold",
									children: member.customerName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${config.bgColor} ${config.color}`,
										children: [getTierIcon(member.tier), member.tier.charAt(0).toUpperCase() + member.tier.slice(1)]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-6 py-4 font-semibold",
									children: [member.points.toLocaleString(), " pts"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-sm",
									children: member.joinedAt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-sm",
									children: member.lastActivityAt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleAdjustPoints(member),
										className: "text-sm text-primary hover:underline",
										children: "Adjust Points"
									})
								})
							]
						}, member.id);
					}) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				isOpen: showAddModal,
				onClose: () => setShowAddModal(false),
				title: "New Loyalty Program",
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setShowAddModal(false),
					className: "px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleSaveProgram,
					className: "px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep",
					children: "Create Program"
				})] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Program Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: formData.name,
							onChange: (e) => setFormData({
								...formData,
								name: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
							placeholder: "Enter program name"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Points per ₵1 Spent"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: formData.pointsPerCedi,
							onChange: (e) => setFormData({
								...formData,
								pointsPerCedi: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
							placeholder: "e.g., 10"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Points Required for ₵1 Discount"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: formData.redemptionRate,
							onChange: (e) => setFormData({
								...formData,
								redemptionRate: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
							placeholder: "e.g., 100"
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				isOpen: showPointsModal,
				onClose: () => {
					setShowPointsModal(false);
					setEditingMember(null);
				},
				title: `Adjust Points - ${editingMember?.customerName}`,
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setShowPointsModal(false);
						setEditingMember(null);
					},
					className: "px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleSavePoints,
					className: "px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep",
					children: "Save Changes"
				})] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						editingMember && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 bg-muted/30 rounded-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Current Balance"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-2xl font-semibold",
									children: [editingMember.points.toLocaleString(), " points"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground mt-1",
									children: ["Tier: ", editingMember.tier.charAt(0).toUpperCase() + editingMember.tier.slice(1)]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Points to Add (negative to deduct)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: pointsFormData.pointsToAdd,
							onChange: (e) => setPointsFormData({
								...pointsFormData,
								pointsToAdd: e.target.value
							}),
							className: "h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary",
							placeholder: "Enter points"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-semibold mb-2",
							children: "Note"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: pointsFormData.note,
							onChange: (e) => setPointsFormData({
								...pointsFormData,
								note: e.target.value
							}),
							rows: 2,
							className: "w-full rounded-md border border-border bg-card p-4 text-sm outline-none focus:border-primary resize-y",
							placeholder: "Reason for adjustment"
						})] })
					]
				})
			})
		]
	});
}
//#endregion
export { AdminLoyalty as component };
