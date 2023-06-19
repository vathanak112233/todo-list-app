import jwt, { JwtPayload } from 'jsonwebtoken';

export function verifyJwt(token: string) {
    try {
        const secret_key = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secret_key!);
        return decoded as JwtPayload;
    } catch (error) {
        console.log(error);
        return null;
    }
}