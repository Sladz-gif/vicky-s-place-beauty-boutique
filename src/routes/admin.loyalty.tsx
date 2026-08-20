import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Edit, Trash2, Star, Award, Crown, Gem, Users, TrendingUp } from "lucide-react";
import { Modal } from "@/components/Modal";
import { formatPrice } from "@/data/api";
import type { LoyaltyProgram, LoyaltyMember } from "@/data/types";
import { useState } from "react";

const mockLoyaltyPrograms: LoyaltyProgram[] = [
  {
    id: "PROG-001",
    name: "Vicky's Rewards",
    pointsPerCedi: 10,
    redemptionRate: 100,
    active: true,
    createdAt: "2024-01-01",
  },
];

const mockLoyaltyMembers: LoyaltyMember[] = [
  {
    id: "MEM-001",
    customerId: "CUST-001",
    customerName: "Ama Asante",
    programId: "PROG-001",
    points: 2500,
    tier: "gold",
    joinedAt: "2024-01-15",
    lastActivityAt: "2024-08-15",
  },
  {
    id: "MEM-002",
    customerId: "CUST-002",
    customerName: "Kwame Mensah",
    programId: "PROG-001",
    points: 850,
    tier: "silver",
    joinedAt: "2024-02-20",
    lastActivityAt: "2024-08-10",
  },
  {
    id: "MEM-003",
    customerId: "CUST-003",
    customerName: "Sarah Johnson",
    programId: "PROG-001",
    points: 3200,
    tier: "platinum",
    joinedAt: "2024-01-10",
    lastActivityAt: "2024-08-18",
  },
  {
    id: "MEM-004",
    customerId: "CUST-004",
    customerName: "John Doe",
    programId: "PROG-001",
    points: 150,
    tier: "bronze",
    joinedAt: "2024-07-01",
    lastActivityAt: "2024-08-05",
  },
];

const tierConfig = {
  bronze: { icon: Award, color: "text-amber-700", bgColor: "bg-amber-100", pointsRequired: 0 },
  silver: { icon: Star, color: "text-gray-500", bgColor: "bg-gray-200", pointsRequired: 500 },
  gold: { icon: Crown, color: "text-yellow-600", bgColor: "bg-yellow-100", pointsRequired: 1500 },
  platinum: { icon: Gem, color: "text-purple-600", bgColor: "bg-purple-100", pointsRequired: 3000 },
};

export const Route = createFileRoute("/admin/loyalty")({
  head: () => ({
    meta: [
      { title: "Loyalty — Admin Dashboard" },
      {
        name: "description",
        content: "Manage loyalty programs for Vicky's Place.",
      },
    ],
  }),
  component: AdminLoyalty,
});

function AdminLoyalty() {
  const [view, setView] = useState<"programs" | "members">("programs");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    pointsPerCedi: "",
    redemptionRate: "",
  });
  const [pointsFormData, setPointsFormData] = useState({
    memberId: "",
    customerName: "",
    pointsToAdd: "",
    note: "",
  });
  const [editingMember, setEditingMember] = useState<LoyaltyMember | null>(null);

  const handleAddProgram = () => {
    setFormData({ name: "", pointsPerCedi: "", redemptionRate: "" });
    setShowAddModal(true);
  };

  const handleSaveProgram = () => {
    console.log("Adding loyalty program:", formData);
    alert("Loyalty program created successfully!");
    setShowAddModal(false);
  };

  const handleAdjustPoints = (member: LoyaltyMember) => {
    setPointsFormData({
      memberId: member.id,
      customerName: member.customerName,
      pointsToAdd: "",
      note: "",
    });
    setEditingMember(member);
    setShowPointsModal(true);
  };

  const handleSavePoints = () => {
    const points = parseInt(pointsFormData.pointsToAdd) || 0;
    console.log("Adjusting points:", {
      memberId: pointsFormData.memberId,
      points,
      note: pointsFormData.note,
    });
    alert(`Points ${points > 0 ? "added" : "deducted"} successfully!`);
    setShowPointsModal(false);
    setEditingMember(null);
  };

  const getTierIcon = (tier: keyof typeof tierConfig) => {
    const config = tierConfig[tier];
    const Icon = config.icon;
    return <Icon className={`h-5 w-5 ${config.color}`} />;
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            Admin
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <h1 className="text-2xl md:text-3xl">Loyalty Program</h1>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 rounded-md border border-border bg-card p-1">
            <button
              onClick={() => setView("programs")}
              className={`px-4 py-2 rounded-md text-sm ${view === "programs" ? "bg-muted" : "hover:bg-muted/50"}`}
            >
              Programs
            </button>
            <button
              onClick={() => setView("members")}
              className={`px-4 py-2 rounded-md text-sm ${view === "members" ? "bg-muted" : "hover:bg-muted/50"}`}
            >
              Members
            </button>
          </div>
          {view === "programs" && (
            <button
              onClick={handleAddProgram}
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
            >
              <Plus className="h-4 w-4" />
              New Program
            </button>
          )}
        </div>
      </div>

      {view === "programs" && (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-xs font-semibold text-muted-foreground">Total Members</span>
              </div>
              <p className="mt-4 text-2xl font-semibold">{mockLoyaltyMembers.length}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <Star className="h-5 w-5 text-yellow-600" />
                <span className="text-xs font-semibold text-muted-foreground">Points Issued</span>
              </div>
              <p className="mt-4 text-2xl font-semibold">
                {mockLoyaltyMembers.reduce((sum, m) => sum + m.points, 0).toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-xs font-semibold text-muted-foreground">Active Programs</span>
              </div>
              <p className="mt-4 text-2xl font-semibold">
                {mockLoyaltyPrograms.filter((p) => p.active).length}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <Award className="h-5 w-5 text-purple-600" />
                <span className="text-xs font-semibold text-muted-foreground">Redemption Rate</span>
              </div>
              <p className="mt-4 text-2xl font-semibold">
                {mockLoyaltyPrograms[0] ? `${mockLoyaltyPrograms[0].redemptionRate} pts = ₵1` : "-"}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card">
            <div className="border-b border-border px-6 py-4">
              <h3 className="font-serif text-lg">Loyalty Programs</h3>
            </div>
            <div className="p-6">
              {mockLoyaltyPrograms.map((program: LoyaltyProgram) => (
                <div key={program.id} className="rounded-lg border border-border bg-card p-6 mb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{program.name}</h3>
                      <p className="text-sm text-muted-foreground">ID: {program.id}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        program.active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {program.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Points per ₵1</p>
                      <p className="font-semibold">{program.pointsPerCedi} points</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Redemption Rate</p>
                      <p className="font-semibold">{program.redemptionRate} points = ₵1</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Members</p>
                      <p className="font-semibold">
                        {mockLoyaltyMembers.filter((m) => m.programId === program.id).length}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {view === "members" && (
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border px-6 py-4">
            <h3 className="font-serif text-lg">Loyalty Members</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Tier</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Points</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Joined</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Last Activity</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockLoyaltyMembers.map((member: LoyaltyMember) => {
                const config = tierConfig[member.tier];
                return (
                  <tr key={member.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 font-semibold">{member.customerName}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${config.bgColor} ${config.color}`}
                      >
                        {getTierIcon(member.tier)}
                        {member.tier.charAt(0).toUpperCase() + member.tier.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      {member.points.toLocaleString()} pts
                    </td>
                    <td className="px-6 py-4 text-sm">{member.joinedAt}</td>
                    <td className="px-6 py-4 text-sm">{member.lastActivityAt}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleAdjustPoints(member)}
                        className="text-sm text-primary hover:underline"
                      >
                        Adjust Points
                      </button>
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
        title="New Loyalty Program"
        footer={
          <>
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProgram}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep"
            >
              Create Program
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Program Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="Enter program name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Points per ₵1 Spent</label>
            <input
              type="number"
              value={formData.pointsPerCedi}
              onChange={(e) => setFormData({ ...formData, pointsPerCedi: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="e.g., 10"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Points Required for ₵1 Discount
            </label>
            <input
              type="number"
              value={formData.redemptionRate}
              onChange={(e) => setFormData({ ...formData, redemptionRate: e.target.value })}
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="e.g., 100"
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showPointsModal}
        onClose={() => {
          setShowPointsModal(false);
          setEditingMember(null);
        }}
        title={`Adjust Points - ${editingMember?.customerName}`}
        footer={
          <>
            <button
              onClick={() => {
                setShowPointsModal(false);
                setEditingMember(null);
              }}
              className="px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleSavePoints}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-deep"
            >
              Save Changes
            </button>
          </>
        }
      >
        <div className="space-y-4">
          {editingMember && (
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-2xl font-semibold">
                {editingMember.points.toLocaleString()} points
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Tier: {editingMember.tier.charAt(0).toUpperCase() + editingMember.tier.slice(1)}
              </p>
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Points to Add (negative to deduct)
            </label>
            <input
              type="number"
              value={pointsFormData.pointsToAdd}
              onChange={(e) =>
                setPointsFormData({ ...pointsFormData, pointsToAdd: e.target.value })
              }
              className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              placeholder="Enter points"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Note</label>
            <textarea
              value={pointsFormData.note}
              onChange={(e) => setPointsFormData({ ...pointsFormData, note: e.target.value })}
              rows={2}
              className="w-full rounded-md border border-border bg-card p-4 text-sm outline-none focus:border-primary resize-y"
              placeholder="Reason for adjustment"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
