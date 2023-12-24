const zod = require("zod");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    // not need to make the database call on each subsequent request
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer")) {
        res.status(401).send({
            message: "Authorization Header is not Present",
        });
    }

    const token = authorization.split(" ")[1];
    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, "you-Secret-key");
        const { username } = decoded;
        const admin = await Admin.findOne({ username });
        if (!admin) {
            res.status(404).send();
        }
        // Attach the decoded payload to the request object for further use
        req.user = admin;
        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // Invalid token
        res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
}

function validateEmail(req, res, next) {
    // using zod and validate the email and password

    try {
        const detailSchema = zod.object({
            username: zod.string().email(),
            password: zod.string().min(8),
        });

        const detail = {
            username: req.body.username,
            password: req.body.password,
        };

        const validatedDetails = detailSchema.safeParse(detail);

        if (validatedDetails.success) {
            next();
        } else {
            res.status(400).send({ message: "Enter the Correct Input" });
        }
    } catch (error) {
        res.status(422).send({ message: "Internal Srver Error" });
    }
}

module.exports = {
    adminMiddleware,
    validateEmail,
};
