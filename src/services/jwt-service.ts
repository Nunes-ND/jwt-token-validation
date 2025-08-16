import JWT from 'jsonwebtoken';

export class JwtService {
	async validateToken(jwt: string) {
		try {
			JWT.verify(jwt, String(process.env.JWT_SECRET), {
				algorithms: ['HS256'],
			});
			return { jwt, valid: true };
		} catch (error) {
			let errorMessage = '';
			if (error instanceof JWT.JsonWebTokenError) {
				errorMessage = error.message;
			}
			if (error instanceof Error) {
				errorMessage = error.message;
			}
			return { error: errorMessage };
		}
	}
}

export const jwtService = new JwtService();
