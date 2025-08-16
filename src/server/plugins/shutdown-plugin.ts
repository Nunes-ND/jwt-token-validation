import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export const shutdownPlugin = fp((server: FastifyInstance) => {
	server.decorate('shutdown', async function (this: FastifyInstance) {
		this.log.info('Shutting down gracefully...');
		await this.close();
		this.log.info('Server closed.');

		if (this.sqlite?.open) {
			this.log.info('Closing database connection...');
			this.sqlite.close();
			this.log.info('Database connection closed.');
		}
	});

	const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
	for (const signal of signals) {
		process.on(signal, async () => {
			server.log.info(`Received ${signal}, initiating shutdown...`);
			await server.shutdown();
			process.exit(0);
		});
	}
});
