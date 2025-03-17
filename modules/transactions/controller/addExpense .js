const mongoose = require("mongoose");
const validator = require("validator");

const addExpense = async (req, res) => {
    const userModel = mongoose.model("user");
    const transactionModel = mongoose.model("transactions");

    const { amount, remarks } = req.body;

    if (!amount) throw "Amount is required";
    if (!remarks) throw "remarks is required";

    if (remarks.length < 5) throw "Remarks must be atleast 5 characters long!";

    console.log(validator.isNumeric(amount.toString()))

    if (!validator.isNumeric(amount.toString())) throw "Amount must be a number";
    if (amount < 0 ) throw "Amount must not be negaive";

    await transactionModel.create({
        user_id: req.user_id,
        amount: amount,
        remarks: remarks,
        transaction_type: "expense",
    });

    await userModel.updateOne({
        _id: user_id,
    },
        {
            $inc: {
                balance: amount * -1 //subtracts the amount provided from the balance
            }
        },
        {
            runValidators: true
        }
    );
    res.status(200).json({
        status: "success",
        message: "Expense added successfully!"
    });
};
module.exports = addExpense;