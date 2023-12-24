const { User } = require("../models");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(401).send({
            message: "Authorization Header is not Present",
        });
    }

    const token = authHeader.split(" ")[1];
    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const username = decoded.username;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send();
        }
        // Attach the decoded payload to the request object for further use
        req.user = user;
        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // Invalid token
        res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
}

module.exports = userMiddleware;
