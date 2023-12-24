const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes 
// working
router.post("/signup", async (req, res) => {
    // Implement user signup logic
    // some addition like input validation can be done
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.send({ message: "User Created Successfully" });
});

// working
router.get("/courses", async (req, res) => {
    const allCourses = await Course.find({});
    res.send({ courses: allCourses });
});

// working
router.post("/courses/:courseId", userMiddleware, async (req, res) => {
    // find course corresponds to the course Id;
    // here we will be having the the course
    const course = await Course.findOne({ courseId: req.params.courseId });
    if (!course) {
        res.status(500).send("Error finding course");
    } else {
        const { username, password } = req.headers;
        const updatedUser = await User.findOneAndUpdate(
            { username: username },
            {
                $push: {
                    purchasedcourses: course,
                },
            },
            { new: true }
        );

		// await updatedUser.save();
    }
    res.status(200).send("Course purchased successfully");
});

// working 
router.get("/purchasedCourses", userMiddleware, async (req, res) => {
    // list all the purchase course of the user
    const { username, password } = req.headers;
    const user = await User.findOne({ username });
    console.log(user);
    res.send({ "All Purchased Courses: ": user.purchasedcourses });
});

module.exports = router;
