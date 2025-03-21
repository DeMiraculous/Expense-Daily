import mongoose from "mongoose";
import validator  from "validator";

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
export default getTransactions;