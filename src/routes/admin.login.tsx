import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { loginStaff } from "@/data/api";
import { useAdminAuth } from "@/lib/admin";
import { Button } from "@/components/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login — Vicky's Place" },
      {
        name: "description",
        content: "Staff login for Vicky's Place admin console.",
      },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdminAuth();
  const [name, setName] = useState("");
  const [loginCode, setLoginCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  if (isAuthenticated) {
    navigate({ to: "/admin" });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const staff = await loginStaff(loginCode);
      if (staff) {
        // Verify name matches (simple check for this mock auth)
        if (staff.name.toLowerCase() === name.toLowerCase().trim()) {
          login(staff);
          navigate({ to: "/admin" });
        } else {
          setError("Name does not match login code");
        }
      } else {
        setError("Invalid login code");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-border bg-card p-8">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl text-gold">Vicky's Place</h1>
            <p className="mt-2 text-sm text-muted-foreground">Admin Console</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loginCode">Login Code</Label>
              <Input
                id="loginCode"
                type="text"
                placeholder="Enter your login code"
                value={loginCode}
                onChange={(e) => setLoginCode(e.target.value)}
                required
              />
            </div>

            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              {/* NOTE: Real authentication with password hashing, JWT tokens, etc. is a later phase.
                  This is UI/UX scaffolding for the admin console. */}
              For demo: Use "Vicky Addo" with code "VP001", "Kofi Osei" with "KO002", "Abena
              Boateng" with "AB003", or "Emmanuel Darko" with "ED004"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
