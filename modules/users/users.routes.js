const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userDashboard = require("./controllers/dashBoard");
const auth = require("../../middleware/auth");


const userRoute = express.Router();//for using route in a file other than app.js

//routes
userRoute.post("/register", register);
userRoute.post("/login", login);

userRoute.use(auth); //a middleware: it will determine wether the next route will go through or not,,using the next() in the auth function

//protected routes
userRoute.get("/dashboard", userDashboard);

module.exports = userRoute;