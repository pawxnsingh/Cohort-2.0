const { Router } = require("express");
// this lib is used to hash the password
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { adminMiddleware, validateEmail } = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../models");

// Admin Routes
// working
router.post("/signup", validateEmail, async (req, res) => {
    // Implement admin signup logic

    // also check the username and password is valid using the zod library

    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        // this will create the a new admin and get stored in database
        await Admin.create({
            username: username,
            // one of the best practice is to hash the pass and then store it
            password: hashedPassword,
        });
        res.status(200).send({ message: "Admin Created Successfully" });
    } catch (err) {
        res.status(500).send({ message: err });
    }
});

// working
router.post("/signin", async (req, res) => {
    // the admin has been signed up and now he is signed in using its username
    // and password, now we have to make a database call check for the username and password
    // entered by the user with data stored in db
    // we have to generate the jwt token as the per the current input by the user
    // and send the jwt token as response

    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin && !(await bcrypt.compare(password, admin.password))) {
            res.status(404).send("UserName and Password don't match");
        } else {
            const jwtToken = jwt.sign({ username }, "you-Secret-key");
            res.status(200).send({ token: jwtToken });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Server Internal Error" });
    }
});
// working
router.post("/courses", adminMiddleware, async (req, res) => {
    // Implement course creation logic
    try {
        const { courseId, title, description, price, imageLink } = req.body;

        await Course.create({
            courseId,
            title,
            description,
            price,
            imageLink,
        });
        return res
            .status(200)
            .send({ message: "Course is Successfully Created" });
    } catch (err) {
        res.status(500).send({ message: "Get Out" });
    }
});

// working 
router.get("/courses", adminMiddleware, async (req, res) => {
    try {
        const allCourses = await Course.find({});
        res.send(allCourses);
    } catch (error) {
        res.status(500).send({ error: error });
    }
});

module.exports = router;
