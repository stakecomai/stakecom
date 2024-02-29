import { fileURLToPath } from "url";
import _jiti from "jiti";

const jiti = _jiti(fileURLToPath(import.meta.url));

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
jiti("./src/env");
jiti("@comstaked/auth/env");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@comstaked/api",
    "@comstaked/auth",
    "@comstaked/db",
    "@comstaked/ui",
    "@comstaked/validators",
  ],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
};

export default config;