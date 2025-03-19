const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    full_name: {
        type: String,
        required: [true, "full name can not be empty!"]
    },

    email: {
        type: String,
        required: [true, "Email is reuired"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "Password is rewuired"],
        minlength: [8, "Password must be at least 8 characters long"],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)"
        ]
    },
    balance: {
        type: Number,
        required: [true, "Balance is required"],
        default: 0
    },
    balance: {
        type: Number,
        required: [true, "Balance is required"],
        default: 0
    },
    reset_code: {
        type: Number,
    },
},
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("users", userSchema)

module.exports = userModel;