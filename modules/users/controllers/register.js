
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwtManager = require("../../../managers/jwtManager");
const emailManager = require("../../../managers/email.Manager");


const register = async (req, res) => {
    const userModel = mongoose.model("users");

    const { full_name, email, password, confirmed_password, balance } = req.body;

    //validations
    if (!email) throw "Email is required";
    if (!password) throw "Password is required";
    if (!full_name) throw "Name field is required";
    if (password !== confirmed_password) throw "Password mixmatched";

    const duplicateEmail = await userModel.findOne({
        email: email
    })

    const hashedPassword = await bcrypt.hash(password, 10);

    if (duplicateEmail) throw "Email Already Exists"
    const createdUser = await userModel.create({
        full_name: full_name,
        email: email,
        password: hashedPassword,
        balance: balance
    });
    const accessToken = jwtManager(createdUser);

    await emailManager(
        createdUser.email,
        "Welcome to Expensetracker. Helps you keep track of your expenses!",
        "<h1> Welcome to Expense Tracker</h1>",
        "Welcome to  Expense Tracker"
    )
    res.status(201).json({
        status: "success",
        accessToken: accessToken
    })
}

module.exports = register; 