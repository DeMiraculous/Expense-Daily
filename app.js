
require("express-async-errors");
const express = require("express");
const errorHandler = require("./handler/errorHandler");
const mongoose = require("mongoose");
const userRoute = require("./modules/users/users.routes");
const transactionModel = require("./models/transaction.model");
const transactionRoute = require("./modules/transactions/transactions.route");

require("dotenv").config();
const app = express();

//connect mongoose to database
mongoose
    .connect(process.env.mongoose_connection)
    .then(() => {
        console.log("Mongo connected successfully")
    }).catch(() => {
        console.log("Mongo connection failed")
    })


//Model initialization
require("./models/users.model");
require("./models/transaction.model")

app.use(express.json());

app.use("/api/user", userRoute)
app.use("/api/transaction", transactionRoute)

app.use(errorHandler)

app.listen(5000, () => {
    console.log("server started succesfully")
})