import { createUser } from "../../models/user.model.js";
import { hashPassword } from "../../utils/hash.js";

export const register = async (req, res) => {
    const { email, username, password } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: "missing required fields." });
    }

    try {
        const hashedPassword = await hashPassword(password);
        await createUser(email, username, hashedPassword);
        return res.status(201).json({ username: username });
    }
    catch (error) {
        console.error(error.message);
        if (error.errno == 1062) return res.status(409).json({ error: "username or email already exists." });
        else return res.status(500).json({ error: "server error: failed to save user" });
    }
}