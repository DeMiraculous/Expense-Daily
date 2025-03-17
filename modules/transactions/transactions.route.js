const express = require("express");
const userDashboard = require("./controllers/dashBoard");
const auth = require("../../middleware/auth");
const addIncome = require("./controller/addIncome");
const addExpense = require("./controller/addExpense ");
const getTransactions = require("./controller/getTransaction");


const transactionRoute = express.Router();//for using route in a file other than app.js


transactionRoute.use(auth); //a middleware: it will determine wether the next route will go through or not,,using the next() in the auth function

//protected routes
transactionRoute.Post("/addIncome", addIncome);
transactionRoute.Post("/addExpense", addExpense);
transactionRoute.Get("/", getTransactions);

module.exports = transactionRoute;