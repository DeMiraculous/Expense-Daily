const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../managers/email.Manager");


const resetPassword = async (req, res) => {
    const userModel = mongoose.model("users");

    const { email, new_password, reset_code } = req.body;

    if (!email) throw "Email is required";
    if (!new_password) throw "Please provide a new password";
    if (!reset_code) throw "Reset code is required!";
    if (new_password.length < 5) throw "password must be atleast 8 characters long";

    const getUserWithResetCode = await userModel.findOne({
        email: email,
        reset_code: reset_code,
    });

    if (!getUserWithResetCode) throw "reset code does not match!";

    const hashedPassword = await bcrypt.hash(new_password, 10);

    await userModel.updateOne({
        email: email
    }, {
        password: hashedPassword,
        reset_code: ""
    }, {
        runValidators: true
    }
    );

    await emailManager(
        email,
        "your password reset is successful! If you did not authorize this operation, please contact our support",
        "your password reset is successful! If you did not authorize this operation, please contact our support",
        "Password reset successfully!"

    );

    res.status(200).json({
        status: "success",
        message: "Password  reset successful!"
    });
}
module.exports = resetPassword;