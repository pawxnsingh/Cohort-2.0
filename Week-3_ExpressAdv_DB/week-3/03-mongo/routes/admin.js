const { Router } = require("express");
const router = Router();
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
// Admin Routes

// working
router.post("/signup", async (req, res) => {
    // in the req object we will have to create the new admin
    // store it to the databases
    const { username, password } = req.body;
    const admin = await Admin.create({ username, password });
    res.status(200).send({ message: "Admin created successfully" });
});
// working
router.post("/courses", adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const { courseId, title, description, price, imageLink, published } =
        req.body;
    const course = await Course.create({
        courseId,
        title,
        description,
        price,
        imageLink,
    });
    if (!course) {
        res.status(500).send("Error creating course");
    }
    res.status(200).json({
        msg: "Course created Successfully",
        courseId: course.courseId,
    });
});
// working
router.get("/courses", adminMiddleware, async (req, res) => {
    const allCourses = await Course.find({});
    res.send({ Course: allCourses });
});

module.exports = router;