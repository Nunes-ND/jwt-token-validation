import z from 'zod';

export const jwtHeadersSchema = z.object({
	authorization: z.string().optional(),
});

export const jwtBodySchema = z.object({
	jwt: z.string().optional(),
});

export const jwtQuerystringSchema = z.object({
	jwt: z.string().optional(),
});
