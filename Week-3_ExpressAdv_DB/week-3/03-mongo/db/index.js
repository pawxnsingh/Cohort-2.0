const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
    "mongodb+srv://admin:7YEKjuLWzCivoTcy@cluster0.efatvaz.mongodb.net/"
);

// Define schemas
const AdminSchema = new mongoose.Schema({
    // AdminCoursesId: [string],
    username: String,
    password: String,
});

const CourseSchema = new mongoose.Schema({
    courseId: Number,
    title: String,
    description: String,
    price: Number,
    imageLink: String,
});
 
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedcourses: [CourseSchema],
});  

// here """Admin""" is the name of the collection and it is represented by the
// adminSchema
const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
    Admin,
    User,
    Course,
};
