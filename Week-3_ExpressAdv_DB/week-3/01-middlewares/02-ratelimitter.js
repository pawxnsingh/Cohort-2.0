const request = require("supertest");
const assert = require("assert");
const express = require("express");
const app = express();
// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only """""""""""""""""""""5 request per second"""""""""""""""""""""
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

let numberOfRequestsForUser = {};
setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000);

app.use((req, res, next) => {
    const user_id = req.headers["user-id"];

    if (numberOfRequestsForUser[user_id]) {
        if (Date.now() - numberOfRequestsForUser[user_id].DateTime < 1000) {
            numberOfRequestsForUser[user_id].count++;
            if (numberOfRequestsForUser[user_id].count > 5) {
                res.status(404).send();
            }
        } else {
            numberOfRequestsForUser[user_id] = {
                count: 1,
                DateTime: Date.now(),
            };
        }
    } else {
        numberOfRequestsForUser[user_id] = { count: 1, DateTime: Date.now() };
    }
    next();
});

app.get("/user", function (req, res) {
    res.status(200).json({ name: "john" });
});

app.post("/user", function (req, res) {
    res.status(200).json({ msg: "created dummy user" });
});

module.exports = app;
