import { createUser } from "../models/user.model.js";
import { hash } from "../utils/hash.js";

export const register = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        password = await hash(password);
        await createUser(username, password);
        res.status(201).json({ username: username });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to save user" });
    }
}