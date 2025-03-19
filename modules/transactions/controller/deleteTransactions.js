const mongoose = require("mongoose");
const validator = require("validator");
const userModel = require("../../../models/users.model");

const deleteTransaction = async (req, res) => {

    const transactionsModel = mongoose.model("transactions");
    const userModel = mongoose.model("users");

    const { transaction_id } = req.params;
    if (!validator.isMongoId(transaction_id.tiString())) throw "Invalid Id"

    const getTransaction = await transactionsModel.findOne({
        _id: transaction_id,
    });

    if (!getTransaction) throw "transaction not found";

    console.log(getTransaction);

    if (getTransaction.transaction_type === "income") {

        await userModel.updateOne({
            _id: getTransaction.user,
        },
            {
                $inc: {
                    balance: getTransaction.amount * -1,
                }
            },
            {
                runValidators: true,
            }
        );

    } else {

        await userModel.updateOne({
            _id: getTransaction.user,
        },
            {
                $inc: {
                    balance: getTransaction.amount,
                }
            },
            {
                runValidators: true,
            }
        );

    }
}

await transactionsModel.deleteOne({
    _id: transaction_id,
});

res.status({
    status: "Delete Successfully!",
    message: "Transaction successfully deleted"

});
module.exports = deleteTransaction;