import pool from "../config/db.js";

async function dropTableUsers() {
    try {
        await pool.query(
            'DROP TABLE IF EXISTS users'
        );
    }
    catch (error) {
        console.error(error.message);
    }
    finally {
        await pool.end();
        process.exit();
    }

}

dropTableUsers();