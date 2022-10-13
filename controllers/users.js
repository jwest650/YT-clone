import { createError } from "../Error.js";
import User from "../models/UserSchema.js";
import Video from "../models/VideoSchema.js";

export const update = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    } else {
        next(createError(403, "you can only update your account"));
    }
};
export const deleteUser = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("userDeleted");
        } catch (error) {
            next(error);
        }
    } else {
        next(createError(403, "you can only delete your account"));
    }
};
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
export const subscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 },
        });
        res.status(200).json("subscription successfull!");
    } catch (error) {
        next(error);
    }
};
export const unsubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 },
        });
        res.status(200).json("unsubscription successfull!");
    } catch (error) {
        next(error);
    }
};
export const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id },
        });

        res.status(200).json("video have been liked");
    } catch (error) {
        next(error);
    }
};
export const dislike = async (req, res, next) => {
    const id = req.user.id;

    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id },
        });

        res.status(200).json("video have been disliked");
    } catch (error) {
        next(error);
    }
};
