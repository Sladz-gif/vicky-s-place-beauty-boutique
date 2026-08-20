// Admin authentication helpers using existing session state
// NOTE: Real authentication with password hashing, JWT tokens, etc. is a later phase
// This is UI/UX scaffolding for the admin console

import { useSession } from "./store";
import type { Staff } from "@/data/types";

export function useAdminAuth() {
  const { state, setStaff, logoutStaff } = useSession();

  return {
    staff: state.staff,
    login: (staff: Staff) => setStaff(staff),
    logout: () => logoutStaff(),
    isAuthenticated: !!state.staff,
    hasModuleAccess: (module: string) =>
      state.staff?.moduleAccess?.includes(module as Staff["moduleAccess"][number]) || false,
  };
}
