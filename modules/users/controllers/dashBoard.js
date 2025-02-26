const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
    const userModel = mongoose.model("users");
    console.log(req.user);

    const getUser = await userModel.findOne({
        _id: req.user.id
    }).select("-password"); //for security reasons
    res.status(200).json({
        status: "success",
        data: getUser,
    });
};
module.exports = userDashboard;