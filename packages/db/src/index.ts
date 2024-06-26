import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { connectionString } from "./config";
import * as auth from "./schema/auth";
import * as stake from "./schema/stake";

export const schema = { ...auth, ...stake };

export { createPgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const ssl = process.env.DATABASE_URL?.includes("localhost") ? false : "require";

const client = postgres(connectionString, {
  ssl,
});

export const db = drizzle(client, { schema });
export const connection = client;
