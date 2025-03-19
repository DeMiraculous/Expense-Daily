const express = require("express");
const auth = require("../../middleware/auth");
const addIncome = require("./controller/addIncome");
const addExpense = require("./controller/addExpense ");
const getTransactions = require("./controller/getTransaction");
const deleteTransaction = require("./controller/deleteTransactions");
const editTransaction = require("./controller/editTransaction");


const transactionRoute = express.Router();//for using route in a file other than app.js


transactionRoute.use(auth); //a middleware: it will determine wether the next route will go through or not,,using the next() in the auth function

//protected routes
transactionRoute.post("/addIncome", addIncome);
transactionRoute.post("/addExpense", addExpense);
transactionRoute.get("/", getTransactions);
transactionRoute.delete("/:transaction_id", deleteTransaction)
transactionRoute.patch("/", editTransaction)

module.exports = transactionRoute;