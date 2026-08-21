# Vercel 500 Server Error Documentation

## Error Description

The deployed site on Vercel consistently returns a **500 Internal Server Error** when attempting to load any page. The error message in the browser console is:

```
Failed to load resource: the server responded with a status of 500 ()
```

## Project Configuration

### Framework Stack
- **Framework**: TanStack Start (@tanstack/react-start v1.168.32)
- **SSR Framework**: Nitro (v3.0.260603-beta)
- **Build Tool**: Vite (v8.2.0)
- **Runtime**: Node.js
- **Routing**: TanStack Router (v1.170.18)

### Current vite.config.ts

```typescript
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { 
      entry: "server",
    },
  },
  nitro: {
    preset: "vercel",
  },
});
```

### Current vercel.json

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".vercel/output",
  "framework": null
}
```

### Package.json Relevant Dependencies

```json
{
  "dependencies": {
    "@tanstack/react-start": "1.168.32",
    "@tanstack/react-router": "1.170.18",
    "@tanstack/router-plugin": "1.168.23"
  },
  "devDependencies": {
    "@lovable.dev/vite-tanstack-config": "^2.15.0",
    "nitro": "3.0.260603-beta",
    "vite": "^8.2.0"
  }
}
```

## Build Output Structure

### Local Build Output (.vercel/output/)

```
.vercel/
└── output/
    ├── config.json
    ├── nitro.json
    ├── functions/
    │   └── __server.func/
    │       ├── index.mjs
    │       ├── package.json
    │       ├── _libs/
    │       ├── _ssr/
    │       └── _chunks/
    └── static/
        └── assets/
```

### Build Output Verification

Running `npm run build` locally produces:
- ✅ Build completes successfully in ~7s
- ✅ Generates `.vercel/output/` directory
- ✅ Contains `functions/__server.func/` with serverless function
- ✅ Contains `static/` with client assets
- ✅ Includes `config.json` and `nitro.json` for Vercel

## Previous Attempts and Results

### Attempt 1: Standard Vite SPA Configuration
**Configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```
**Result:** Failed - No `index.html` entry point, TanStack Start requires SSR

### Attempt 2: .output/public Directory
**Configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".output/public",
  "framework": null
}
```
**Result:** Failed - 500 error, incorrect Nitro output structure

### Attempt 3: .output Directory
**Configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".output",
  "framework": null
}
```
**Result:** Failed - 500 error, Nitro default output not compatible with Vercel

### Attempt 4: .output/server Directory
**Configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".output/server",
  "framework": null
}
```
**Result:** Failed - 500 error, incorrect subdirectory

### Attempt 5: .vercel/output without Nitro preset
**Configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".vercel/output",
  "framework": null
}
```
**vite.config.ts:**
```typescript
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});
```
**Result:** Failed - 500 error, Nitro generated `.output/` instead of `.vercel/output/`

### Attempt 6: Nitro with vercel preset (Current)
**Configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".vercel/output",
  "framework": null
}
```
**vite.config.ts:**
```typescript
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "vercel",
  },
});
```
**Result:** Still failing with 500 error despite correct build output structure

## Potential Root Causes

### 1. Vercel Build Output API Version Mismatch
- Nitro's vercel preset may be targeting an older version of Vercel's Build Output API
- Vercel may have updated their API, causing incompatibility

### 2. @lovable.dev/vite-tanstack-config Interference
- The lovable config wrapper may be overriding Nitro's preset configuration
- There could be conflicting plugin configurations

### 3. TanStack Start Version Compatibility
- TanStack Start v1.168.32 may have compatibility issues with Nitro v3.0.260603-beta
- The versions may not be designed to work together

### 4. Server Entry Point Configuration
- The `server: { entry: "server" }` configuration may not be compatible with Vercel preset
- Nitro may need a different entry point format for Vercel

### 5. Missing Vercel Runtime Dependencies
- The serverless function may be missing required Node.js dependencies
- Vercel's Node.js runtime may not support certain features used by Nitro

## Next Steps to Investigate

### Option 1: Remove @lovable.dev/vite-tanstack-config
Configure TanStack Start directly without the lovable wrapper:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/start/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsConfigPaths(),
    tanstackStart({
      tsr: {
        generatedRouteTree: "./src/routeTree.gen.ts",
      },
    }),
  ],
});
```

### Option 2: Use Nitro Directly
Bypass TanStack Start's Nitro integration and configure Nitro directly:

```typescript
import { defineConfig } from "vite";
import nitro from "nitro/config/vite";

export default defineConfig({
  plugins: [
    nitro({
      preset: "vercel",
    }),
  ],
});
```

### Option 3: Check Vercel Deployment Logs
Review Vercel's deployment logs for specific error messages:
- Check function build logs
- Review runtime error messages
- Identify which specific file or module is causing the 500 error

### Option 4: Try Alternative Vercel Preset
Nitro may have alternative Vercel presets:
- `vercel-edge` for Edge Functions
- `vercel-static` for static-only deployment
- Custom Nitro configuration for Vercel

### Option 5: Downgrade/Upgrade Versions
Test different version combinations:
- Try stable Nitro release instead of beta
- Try different TanStack Start version
- Ensure all @tanstack packages are compatible

## POS Route Verification

### Route Registration (routeTree.gen.ts)
```typescript
import { Route as AdminPosRouteImport } from './routes/admin.pos'
// ... line 27
```
✅ POS route is properly registered

### Navigation Link (AdminNav.tsx)
```typescript
const navItems: NavItem[] = [
  { label: "Dashboard", to: "/admin", module: "" },
  { label: "POS", to: "/admin/pos", module: "inventory" }, // line 14
  // ...
];
```
✅ POS is linked in navigation

### Route File (src/routes/admin.pos.tsx)
```typescript
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/pos")({
  head: () => ({
    meta: [
      { title: "POS — Admin Dashboard" },
      {
        name: "description",
        content: "Point of Sale for Vicky's Place.",
      },
    ],
  }),
  component: AdminPOS,
});
```
✅ POS route file exists and is properly configured

## Conclusion

The 500 server error is **not a routing issue** - the POS route is correctly implemented and registered. The issue is purely a **deployment/build-output problem** with Vercel's Build Output API compatibility with TanStack Start's Nitro integration.

The local build generates the correct `.vercel/output/` structure with functions and static assets, but Vercel is unable to execute the serverless function successfully, resulting in a 500 error.

## Git Commits Related to Deployment Fixes

1. `60553dd` - Fix sidebar position and chart overlapping issues
2. `4d00516` - Fix Vercel deployment configuration for TanStack Start Nitro output
3. `676c1ab` - Add Nitro vercel preset to generate .vercel/output structure

## Status

- ❌ 500 server error persists despite correct build output structure
- ✅ Local build works correctly
- ✅ POS route is properly registered and linked
- ❌ Vercel deployment fails at runtime
