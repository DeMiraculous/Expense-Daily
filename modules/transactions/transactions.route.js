import express from "express";
import auth from "../../middleware/auth.js";
import addIncome from "./controller/addIncome.js";
import addExpense from "./controller/addExpense.js";
import getTransactions from "./controller/getTransaction.js";
import deleteTransaction from "./controller/deleteTransactions.js";
import editTransaction from "./controller/editTransaction.js";

const transactionRoute = express.Router(); // for using route in a file other than app.js

transactionRoute.use(auth); // middleware to check authentication

// Protected routes
transactionRoute.post("/addIncome", addIncome);
transactionRoute.post("/addExpense", addExpense);
transactionRoute.get("/", getTransactions);
transactionRoute.delete("/:transaction_id", deleteTransaction);
transactionRoute.patch("/", editTransaction);

export default transactionRoute; 
