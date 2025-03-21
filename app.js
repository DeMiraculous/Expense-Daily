import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./modules/users/users.routes.js";
import transactionRoute from "./modules/transactions/transactions.route.js";
import errorHandler from "./handler/errorHandler.js";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors()) // allows our api endpoint to be accessed from anywhere
app.use(express.json());

// Connect to MongoDB with top-level await
try {
    await mongoose.connect(process.env.mongoose_connection);
    console.log("Mongo connected successfully");
} catch (error) {
    console.error("Mongo connection failed", error);
}

// Model initialization 
import "./models/users.model.js";
import "./models/transactions.model.js";

app.use("/api/user", userRoute);
app.use("/api/transaction", transactionRoute);

// Handle unknown routes
app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "failed",
        message: "Not found!"
    });
});

app.use(errorHandler);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}`);
});
