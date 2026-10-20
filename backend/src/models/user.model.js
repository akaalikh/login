import pool from "../config/db.js";

export const createUser = async (email, username, hashedPassword) => {
    const result = await pool.query(
        'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
        [email, username, hashedPassword]
    );
    return result;
}

export const findUserByUsername = async (username) => {
    const rows = await pool.query(
        'SELECT * FROM users WHERE username = ?',
        [username]
    );

    if (rows.length > 0) return rows[0];
    else return false;
} 