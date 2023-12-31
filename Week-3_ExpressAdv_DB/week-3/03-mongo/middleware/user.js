const { User } = require("../db");

async function userMiddleware(req, res, next) {
    const { username, password } = req.headers;

    const VerifiedAdmin = await User.findOne({
        username: username,
        password: password,
    });

    if (!VerifiedAdmin) {
        res.status(401).send("Unauthorized");
        return;
    } else {
        next();
    }
}

module.exports = userMiddleware;
