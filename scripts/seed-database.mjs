#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { Client } from "pg";

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is required to seed the database.");
    process.exit(1);
  }

  const seedPath = path.resolve("db/seed.sql");
  const sql = await readFile(seedPath, "utf8");

  const client = new Client({ connectionString: databaseUrl });
  await client.connect();
  await client.query(sql);
  await client.end();

  console.log("Database seeded successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
