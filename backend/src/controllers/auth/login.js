import { findUserByUsername } from "../../models/user.model.js";
import { verifyPassword } from "../../utils/hash.js";
import { generateJWT } from "../../utils/jwt.js";

const DUMMY_HASH = "$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ error: "missing required fields." });

    try {
        const user = await findUserByUsername(username);

        const targetHash = user ? user.password : DUMMY_HASH;
        const isMatch = await verifyPassword(password, targetHash);

        if (!user || !isMatch) {
            return res.status(401).json({ error: "invalid username or password." });
        }

        const token = await generateJWT({ sub: user.id }, '2m');

        return res.status(200).json({ username: user.username, token: token });
    }
    catch (error) {
        console.error("login error:", error.message);
        return res.status(500).json({ error: "internal server error occurred." })
    }
}