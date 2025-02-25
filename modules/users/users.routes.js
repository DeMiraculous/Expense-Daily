const express = require("express");
const register = require("./controllers/register");

const userRoute = express.Router();//for using route in a file other than app.js

//routes
userRoute.post("/register", register)

module.exports = userRoute;