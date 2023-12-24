const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

require("dotenv").config();

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.all("*", (req, res) => {
    res.status(404).send({ message: "Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



 

