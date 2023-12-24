const jwt = require("jsonwebtoken");
const zod = require("zod");
const jwtPassword = "secret";

const isValidCredentials = (username, password) => {
    const userSchema = zod.object({
        username: zod.string().email(),
        password: zod.string().min(6),
    });

    const user = { username, password };

    const validatedInput = userSchema.safeParse(user);
    return validatedInput.success;
};

function signJwt(username, password) {
    if (isValidCredentials(username, password)) {
        const token = jwt.sign({ username: username }, jwtPassword);
        return token;
    } else {
        return null;
    }
    // return null;
}

function verifyJwt(token) {
    try {
        let veriftjwt = jwt.verify(token, jwtPassword);
        return true;
    } catch (err) {
        return false;
    }
}

function decodeJwt(token) {
    const decodejwt = jwt.decode(token);
    if (decodejwt) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    signJwt,
    verifyJwt,
    decodeJwt,
    jwtPassword,
};
