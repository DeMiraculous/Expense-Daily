const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const emailManager = require("../../../managers/email.Manager");


const forgotPassword = async (req, res) => {
    const userModel = mongoose.model("users");

    const { email } = req.body;

    if (!email) throw "Ëmail is required!";

    const getUserEmail = await userModel.findOne({
        email: email,
    });
    if (!getUserEmail) throw "Invalid Email";

    const reset_code = Math.floor(10000 + Math.random() * 90000);

    await userModel.updateOne({
        email: email,
    }, {
        reset_code: reset_code,
    },
        {
            runValidators: true,
        }
    );

    await emailManager(
        email,
        "Your password reset code is " + reset_code,
        "Your password reset code is " + reset_code,
        "Reset Your Password - Expense Tracker"
    )

    res.status(200).json({
        status: "success",
        message: "Reset code sent successfully"
    });

}
module.exports = forgotPassword;