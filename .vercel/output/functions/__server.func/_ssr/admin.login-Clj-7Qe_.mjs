import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as loginStaff, r as Button } from "./router-DsJhwsz_.mjs";
import { n as Label, t as Input, u as useSession } from "./router-DsJhwsz_2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.login-Clj-7Qe_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useAdminAuth() {
	const { state, setStaff, logoutStaff } = useSession();
	return {
		staff: state.staff,
		login: (staff) => setStaff(staff),
		logout: () => logoutStaff(),
		isAuthenticated: !!state.staff,
		hasModuleAccess: (module) => state.staff?.moduleAccess?.includes(module) || false
	};
}
function AdminLogin() {
	const navigate = useNavigate();
	const { login, isAuthenticated } = useAdminAuth();
	const [name, setName] = (0, import_react.useState)("");
	const [loginCode, setLoginCode] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	if (isAuthenticated) {
		navigate({ to: "/admin" });
		return null;
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);
		try {
			const staff = await loginStaff(loginCode);
			if (staff) {
				if (staff.name.toLowerCase() === name.toLowerCase().trim()) {
					login(staff);
					navigate({ to: "/admin" });
				} else setError("Name does not match login code");
			} else setError("Invalid login code");
		} catch (err) {
			setError("Login failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-muted/30",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full max-w-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-card p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-serif text-2xl text-gold",
							children: "Vicky's Place"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Admin Console"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "name",
									children: "Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "name",
									type: "text",
									placeholder: "Your name",
									value: name,
									onChange: (e) => setName(e.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "loginCode",
									children: "Login Code"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "loginCode",
									type: "text",
									placeholder: "Enter your login code",
									value: loginCode,
									onChange: (e) => setLoginCode(e.target.value),
									required: true
								})]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-md bg-red-50 p-3 text-sm text-red-600",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full",
								disabled: isLoading,
								children: isLoading ? "Signing in..." : "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "For demo: Use \"Vicky Addo\" with code \"VP001\", \"Kofi Osei\" with \"KO002\", \"Abena Boateng\" with \"AB003\", or \"Emmanuel Darko\" with \"ED004\""
						})
					})
				]
			})
		})
	});
}
//#endregion
export { AdminLogin as component };
