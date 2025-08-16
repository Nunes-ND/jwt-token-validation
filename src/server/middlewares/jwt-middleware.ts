import type { FastifyReply, FastifyRequest } from 'fastify';
import type z from 'zod';
import type {
	jwtBodySchema,
	jwtHeadersSchema,
	jwtQuerystringSchema,
} from '../schemas/jwt-schema';

export const jwtMiddleware = async (
	request: FastifyRequest<{
		Headers: z.infer<typeof jwtHeadersSchema>;
		Body: z.infer<typeof jwtBodySchema>;
		Querystring: z.infer<typeof jwtQuerystringSchema>;
	}>,
	reply: FastifyReply,
) => {
	const jwt =
		request.headers.authorization || request.body?.jwt || request.query?.jwt;
	if (!jwt) {
		return reply.status(400).send({ data: { error: 'Jwt is required' } });
	}
	request.jwt = jwt;
};
