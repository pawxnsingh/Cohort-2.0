const mongoose = require("mongoose");
require("dotenv").config();
// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL);

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // this will maintain the uniqueness of the username across the database
    },

    password: {
        type: String,
        required: true,
        length: 8,
    },
}); 

const CourseSchema = new mongoose.Schema({
    courseId: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageLink: {
        type: String,
        required: true,
    },
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        length: 8,
    },
    purchasedCourses: [
        {
            // each element of this array must ressemble this schema
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

// module.exports = {
//     Admin,
//     User,
//     Course,
// };
