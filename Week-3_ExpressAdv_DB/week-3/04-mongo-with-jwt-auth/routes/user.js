const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const bcrypt = require("bcrypt");
const { User, Course } = require("../models");
const jwt = require("jsonwebtoken");

// User Routes - Working
router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username: username,
            password: hashedPassword,
        });

        res.status(200).send({ message: "User Created Successfully" });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/signin", async (req, res) => {
    // Implement admin signup logic
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            res.status(404).send({ message: "Not Found Please Signup First" });
        }
        const token = jwt.sign({ username }, "you-Secret-key");
        res.send({
            Token: token,
        });
    } catch (error) {
        res.status(500).send();
    }
});

router.get("/courses", async (req, res) => {
    const courseList = await Course.find({});

    if (!courseList) {
        res.status(404).send({ message: "Not Found" });
    } else {
        res.send({ courses: courseList });
    }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
    // Implement course purchase logic
    try {
        const courseId = req.params.courseId;
        const course = await Course.findOne({ courseId });

        if (!course) {
            res.status(404).send({ message: "Course Not Found" });
        } else {
            const user = await User.findOneAndUpdate(
                {
                    username: req.user.username,
                },
                {
                    $push: {
                        purchasedCourses: course,
                    },
                },
                {
                    new: true, // This option returns the modified document
                }
            );

            res.send({ message: "Course is Purchased" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
    try {
        const username = req.user.username;
        const getUser = await User.findOne({ username }).populate(
            "purchasedCourses"
        );

        if (!getUser) {
            res.status(404).send();
        } else {
            res.status(200).send({ courses: getUser.purchasedCourses });
        }
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;
