import bcrypt from "bcrypt";

export const hash = async (password) => {
    const saltRounds = 10;

    let salt;
    try {
        salt = await bcrypt.genSalt(saltRounds);
    } catch (err) {
        console.error("bcrypt: couldn't generate salt.", err.message);
        throw err;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        console.error("bcrypt: hash error.", err.message);
        throw err;
    }
};