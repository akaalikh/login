import { verifyJWT } from "../utils/jwt.js"

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'access denied. no token provided.' });
    }

    try {
        const result = await verifyJWT(token);

        if (!result.valid) {
            return res.status(result.status).json({ error: result.error });
        }

        req.user = result.payload;

        return next();
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "internal server error." });
    }

    return result;
}