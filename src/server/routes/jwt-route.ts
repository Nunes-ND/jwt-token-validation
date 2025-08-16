import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { jwtService } from '@/services/jwt-service';
import { jwtMiddleware } from '../middlewares/jwt-middleware';
import {
	jwtBodySchema,
	jwtHeadersSchema,
	jwtQuerystringSchema,
} from '../schemas/jwt-schema';

export const jwtRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		'/tokens/jwt/validate',
		{
			schema: {
				headers: jwtHeadersSchema,
				body: jwtBodySchema,
				querystring: jwtQuerystringSchema,
			},
			preHandler: [jwtMiddleware],
		},
		async (request, reply) => {
			try {
				const result = await jwtService.validateToken(request.jwt);
				if (result.error) {
					server.log.error(result.error);
					reply.status(400).send({ data: { error: 'Jwt is invalid' } });
				}
				reply.send({ data: result });
			} catch (error) {
				if (error) server.log.error(error);
				reply.status(400).send({ data: { error: 'Unexpected error' } });
			}
		},
	);
};
