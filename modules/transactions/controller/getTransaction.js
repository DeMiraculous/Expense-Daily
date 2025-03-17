const mongoose = require("mongoose");
const validator = require("validator");

const getTransactions = async (req, res) => {
    const transactionModel = mongoose.model("transactions");

    console.log(req.query)
    const transactions = await transactionModel.find({
        user_id: req.user_id,
        ...req.query,
    })
    res.status(200).json({
        status: "sucess",
        data: transactions,

    });
}
module.exports = getTransactions;