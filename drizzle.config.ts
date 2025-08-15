import type { Config } from 'drizzle-kit';

export default {
	out: './drizzle',
	schema: './src/database/schema.ts',
	dialect: 'sqlite',
	dbCredentials: {
		url: process.env.DB_FILE_NAME as string,
	},
} satisfies Config;
