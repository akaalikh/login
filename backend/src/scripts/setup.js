import pool from "../config/db.js";

async function createTables() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(30) NOT NULL UNIQUE,
                password CHAR(60) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            `);
        console.log("Table 'users' is ready!");
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end()
        process.exit();
    }
}

createTables();