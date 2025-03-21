import mongoose from "mongoose";

const userDashboard = async (req, res) => {
    const userModel = mongoose.model("users");
    const transactionModel = mongoose.model("transactions");

    console.log(req.user);

    const getUser = await userModel.findOne({
        _id: req.user.id
    }).select("-password"); //for security reasons


    const transactions = await transactionModel.find({
        user_id: req.user_id,
    })
        .sort("-createdAt")//will display the transaction in descending order
        .limit(2); //will display two sets of transaction data in descending order
    res.status(200).json({
        status: "success",
        data: getUser,
        transactions
    });
};
export default userDashboard;