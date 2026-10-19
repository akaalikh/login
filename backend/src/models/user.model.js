import pool from "../config/db.js";

export const createUser = async (username, hashedPassword) => {
    const result = await pool.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword]
    );
    return result;
}