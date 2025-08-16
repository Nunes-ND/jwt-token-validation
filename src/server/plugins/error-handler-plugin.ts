import type {
	FastifyError,
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
} from 'fastify';
import fp from 'fastify-plugin';
import {
	hasZodFastifySchemaValidationErrors,
	isResponseSerializationError,
} from 'fastify-type-provider-zod';

export const errorHandler = fp((fastify: FastifyInstance) => {
	fastify.setErrorHandler(
		(error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
			fastify.log.error(error);

			const issues: string[] =
				error.validation?.map((issue) => issue.schemaPath) || [];
			if (issues.length && request.url.includes('/tokens/jwt/validate')) {
				return reply.code(400).send({ data: { error: 'Jwt is invalid' } });
			}

			if (hasZodFastifySchemaValidationErrors(error)) {
				return reply.code(400).send({
					error: 'Internal Server Error',
					message: "Validation error. Can't validate response.",
					statusCode: 400,
				});
			}

			if (isResponseSerializationError(error)) {
				return reply.code(500).send({
					error: 'Internal Server Error',
					message: "Serialization error. Can't serialize response.",
					statusCode: 500,
				});
			}

			const statusCode = error.statusCode || 500;
			const message =
				statusCode < 500 || process.env.NODE_ENV !== 'production'
					? error.message
					: 'An unexpected error occurred.';

			return reply.status(statusCode).send({
				statusCode,
				error: error.name || 'Internal Server Error',
				message,
			});
		},
	);
});
