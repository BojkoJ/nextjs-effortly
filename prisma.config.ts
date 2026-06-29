import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
	schema: "prisma/schema.prisma",
	migrations: {
		path: "prisma/migrations",
	},
	// Prisma CLI (migrate / db push / studio) používá přímé (nepoolované)
	// připojení. Aplikace za běhu používá pooled DATABASE_URL přes driver
	// adapter v lib/db.ts.
	datasource: {
		url: env("DIRECT_URL"),
	},
});
