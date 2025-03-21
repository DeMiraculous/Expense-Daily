import mongoose from "mongoose";
import validator from "validator";

const editTransaction = async (req, res) => {
    const transactionsModel = mongoose.model("transactions");

    const { transaction_id, remarks, amount, transaction_type } = req.body;

    if (!transaction_id) throw "Transaction_id is required";
    if (transaction_type !=="income" && transaction_type !== "expense") throw "Transaction_type is invalid";

    if (!validator.isMongoId(transaction_id.tiString())) throw "Invalid Id"

    const getTransaction = await transactionsModel.findOne({
        _id: transaction_id,
    });

    if (!getTransaction) throw "Transaction not found";
    await transactionsModel.updateOne({
        _id: transaction_id,
    }, {
        remarks,
        // transaction_type,
        // amount,
    },
        {
            runValidators: true
        })
    res.status(200).json({

    })
}
export default editTransaction;