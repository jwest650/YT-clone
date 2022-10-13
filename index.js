import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
import videoRoute from "./routes/video.js";
import commentRoute from "./routes/comments.js";
import cors from "cors";
import chalk from "chalk";
const app = express();
const port = process.env.PORT || 5000;
dotenv.config();
const connect = () => {
    mongoose
        .connect(process.env.MONGO)
        .then(() => console.log(chalk.blue.bold("connected to mongoose")))
        .catch((err) => console.log(err));
};
app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/comments", commentRoute);
app.use("/api/video", videoRoute);
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "something went wrong";
    res.status(status).json({
        success: false,
        message,
        status,
    });
});
app.listen(port, () => {
    connect();
    console.log(chalk.yellow.underline.dim(`runinng on port ${port}`));
});
