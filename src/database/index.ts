import Database from 'better-sqlite3';
import {
	type BetterSQLite3Database,
	drizzle,
} from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

const dbFile = String(process.env.DB_FILE_NAME);

let sqlite: Database.Database | undefined;
export let drizzleClient: BetterSQLite3Database<typeof schema>;

export function initializeDatabase() {
	try {
		if (!sqlite) {
			sqlite = new Database(dbFile, { fileMustExist: true });
			sqlite.pragma('journal_mode = WAL');
			drizzleClient = drizzle(sqlite, { schema });
		}
		return sqlite;
	} catch (_error) {
		throw new Error(
			`Failed to connect to database at ${dbFile}. Please ensure the file exists and has correct permissions.`,
		);
	}
}
