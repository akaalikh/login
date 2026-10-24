import { SignJWT, jwtVerify, errors as joseErrors } from "jose";

const getSecret = () => {
    return new TextEncoder().encode(process.env.JWT_SECRET);
}

export const generateJWT = async (payload, exp = '2m') => {
    const secret = getSecret();

    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(exp)
        .sign(secret);

    return jwt;
}

export const verifyJWT = async (jwt) => {
    const secret = getSecret();

    try {
        const { payload, protectedHeader } = await jwtVerify(jwt, secret, { algorithms: ["HS256"], });

        return { valid: true, payload, protectedHeader };
    }
    catch (error) {
        if (error instanceof joseErrors.JWTExpired) {
            return { valid: false, status: 403, error: "token has expired." };
        }
        if (error instanceof joseErrors.JOSEError) {
            return { valid: false, status: 403, error: "invalid token." };
        }

        throw error;
    }

}