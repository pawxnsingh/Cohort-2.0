const express = require("express");
// import express from "express";
// Express don't provide the way to parse the body
// so we have to the external library called body-parser
// body-parser is the middleware that is used to parse body
// middleware has different use cases as well, kirat will it later
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
// this req obejct will come from the client side which include
// request header,request body, query param

app.get("/",(req,res)=>{
    console.log(req.headers);

    res.status(401).send("<b>Hello World</b>");
})




// and in the res side is the respose object which we can use to respond to the server
// this generally include
app.post("/backend-api/conversation", function (req, res) {
    // req and res are the javascript object and we can perform any operation to it
    // for example in the case of the real-life application we can acutally make a database call
    // let  simualate a db call
    let message = req.body.message;
    console.log(message);

    // res.send("Hello World!");
    res.json({
        msg: "2+2=4",
    });
});

// here if we try to access the body
app.post("/conversation", (req, res) => {
    // this body will show undefined
    // and are something called middlewares

    let message = req.query.message;
    console.log(message);
    // console.log(req.body); // this gave me undefined before installing the body-parser
    // and after installing what must it should give the parsed json()

    res.send({
        msg: "2 + 2 = 4",
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
