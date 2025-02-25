const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken");

const login = async (req, res) => {

    const userModel = mongoose.model("users");
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email,
    });

    if (!user) throw "user does not exists";
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) throw "Incorrect email or password";

    const accessToken = await jsonwebtoken.sign({
        id: user.id,
        name: user.name
    },
        process.env.Jwt_Key
    );
    console.log(user)
    //success response
    res.status(200).json({
        status: "success",
        message: "user logged in successfully!",
        accessToken: accessToken
    });
};

module.exports = login;