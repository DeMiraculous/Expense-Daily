import mongoose from "mongoose";
import validator from "validator";
import transactionsModel from "../../../models/transactions.model.js";
import userModel from "../../../models/users.model.js";

const deleteTransaction = async (req, res) => {
    try {
        const transactionsModel = mongoose.model("transactions");
        const userModel = mongoose.model("users");

        const { transaction_id } = req.params;
        if (!validator.isMongoId(transaction_id.toString())) throw "Invalid Id"

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


        await transactionsModel.deleteOne({
            _id: transaction_id,
        });

        res.status({
            status: "Delete Successfully!",
            message: "Transaction successfully deleted"

        });

    } catch (error) {
        return res.status(500).json({ status: "failed", error: error.message || error });
    }
}
export default deleteTransaction;