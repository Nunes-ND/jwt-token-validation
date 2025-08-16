import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export const swaggerPlugin = fp((server: FastifyInstance) => {
	if (process.env.NODE_ENV === 'development') {
		server.register(fastifySwagger, {
			openapi: {
				info: {
					title: 'Jwt Token Validation',
					description: 'Sample swagger documentation',
					version: '0.1.0',
				},
				servers: [{ url: String(process.env.SWAGGER_SERVER_URL) }],
			},
			transform: jsonSchemaTransform,
		});
		const routePrefix = process.env.SWAGGER_ROUTE_PREFIX || '/documentation';
		server.register(fastifySwaggerUI, {
			routePrefix,
			uiConfig: {
				docExpansion: 'list',
				deepLinking: false,
			},
			staticCSP: true,
			transformSpecificationClone: true,
		});

		server.log.info(`Swagger documentation enabled at ${routePrefix}`);
	}
});
