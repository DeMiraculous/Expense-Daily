import express from "express";
import register from "./controllers/register.js";
import login from "./controllers/login.js";
import userDashboard from "./controllers/dashBoard.js";
import auth from "../../middleware/auth.js";
import forgotPassword from "./controllers/forgotPassword.js";
import resetPassword from "./controllers/resetPassword.js";

const userRoute = express.Router();//for using route in a file other than app.js

//routes
userRoute.post("/register", register);
userRoute.post("/login", login);

userRoute.post("/forgot-password", forgotPassword);
userRoute.post("/reset-password", resetPassword);

userRoute.use(auth); //a middleware: it will determine wether the next route will go through or not,,using the next() in the auth function

//protected routes
userRoute.get("/dashboard", userDashboard);

export default userRoute;