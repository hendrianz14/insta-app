#!/usr/bin/env node
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { Client } from "pg";

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is required to run migrations.");
    process.exit(1);
  }

  const client = new Client({ connectionString: databaseUrl });
  await client.connect();

  const migrationsDir = path.resolve("db/migrations");
  const files = (await readdir(migrationsDir)).filter((file) => file.endsWith(".sql")).sort();

  for (const file of files) {
    const sql = await readFile(path.join(migrationsDir, file), "utf8");
    console.log(`\nRunning migration: ${file}`);
    await client.query(sql);
  }

  await client.end();
  console.log("Migrations completed successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
