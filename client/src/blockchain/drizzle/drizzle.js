import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

const sql = neon(import.meta.env.VITE_DRIZZLE_DATABASE_URL);
export const db = drizzle(sql);
