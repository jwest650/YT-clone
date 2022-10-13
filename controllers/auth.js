import mongoose from "mongoose";
import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import { createError } from "../Error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();
        res.status(200).send("created");
    } catch (error) {
        next(error);
    }
};
export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.body.name });

        if (!user) {
            return next(createError(404, "user not found"));
        }

        const isCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isCorrect) {
            return next(createError(400, "wrong credentials"));
        }
        const { password, ...other } = user._doc;
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json(other);
    } catch (error) {
        next(error);
    }
};

export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT);
            res.cookie("access_token", token, {
                httpOnly: false,
            })
                .status(200)
                .json(user._doc);
        } else {
            const newUser = new User({ ...req.body, fromGoogle: true });
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
            res.cookie("access_token", token, {
                httpOnly: true,
            })
                .status(200)
                .json(savedUser._doc);
        }
    } catch (error) {
        next(error);
    }
};
