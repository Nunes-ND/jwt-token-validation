import Database from 'better-sqlite3';
import {
	type BetterSQLite3Database,
	drizzle,
} from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

type DbConnections = {
	sqlite: Database.Database;
	client: BetterSQLite3Database<typeof schema>;
};

let connections: DbConnections | undefined;

export function initializeDatabase() {
	if (connections) {
		return connections;
	}

	const dbFile = process.env.DB_FILE_NAME;
	if (!dbFile) {
		throw new Error(
			'Database file path is not configured. Check DB_FILE_NAME environment variable.',
		);
	}

	try {
		const sqlite = new Database(dbFile, { fileMustExist: true });
		sqlite.pragma('journal_mode = WAL');
		const client = drizzle(sqlite, { schema });
		connections = { sqlite, client };
		return connections;
	} catch (_error) {
		throw new Error(`Failed to connect to database at "${dbFile}".`);
	}
}

export function getDrizzleClient(): BetterSQLite3Database<typeof schema> {
	if (!connections) {
		throw new Error(
			'Database has not been initialized. Call initializeDatabase() first.',
		);
	}
	return connections.client;
}
