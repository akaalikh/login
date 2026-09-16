import bcrypt from "bcrypt";

export const hash = (password) => {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            console.err("bcrypt: couldn't generate salt.");
            return;
        }
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                console.error("bcrypt: hash error.");
                return;
            }
            console.log(hash);
        })
    })
}