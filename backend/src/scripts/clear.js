import pool from "../config/db.js";

async function clearUsersTable() {
    try {
        await pool.query(
            'TRUNCATE TABLE users'
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

clearUsersTable();