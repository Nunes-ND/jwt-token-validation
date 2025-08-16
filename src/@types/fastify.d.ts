import type Database from 'better-sqlite3';
import 'fastify';

declare module 'fastify' {
	export interface FastifyInstance {
		shutdown: () => Promise<void>;
		sqlite?: Database.Database;
	}

	export interface FastifyRequest {
		jwt: string;
	}
}
