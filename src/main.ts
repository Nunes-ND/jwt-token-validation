import type { FastifyInstance } from 'fastify';
import { initializeDatabase } from './database';
import { server } from './server/';
import { shutdownPlugin } from './server/plugins/shutdown-plugin';

export async function main(server: FastifyInstance) {
	try {
		server.log.info('Initializing server...');
		server.register(shutdownPlugin);

		server.log.info('Initializing database connection...');
		const sqlite = initializeDatabase();
		server.decorate('sqlite', sqlite);
		server.log.info('Database connected successfully.');

		await server.listen({
			port: Number(process.env.PORT),
			host: '0.0.0.0',
		});
	} catch (error) {
		if (error instanceof Error) {
			server.log.error(error.message);
		}

		if (server.shutdown) {
			await server.shutdown();
		}
		process.exit(1);
	}
}

main(server);
