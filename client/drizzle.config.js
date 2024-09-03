/** @type { import("drizzle-kit").Config } */
export const db = {
  schema: ["../client/src/blockchain/schema/schema.js"],
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres_url",
  },
};
