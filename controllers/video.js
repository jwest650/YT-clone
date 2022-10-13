import { createError } from "../Error.js";
import User from "../models/UserSchema.js";
import Video from "../models/VideoSchema.js";

export const addvideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });

    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (error) {
        next(error);
    }
};
export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "video not found"));
        if (req.user.id == video.userId) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("video deleted");
        } else {
            next(createError(403, "you can delete only your video"));
        }
    } catch (error) {
        next(error);
    }
};
export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "video not found"));
        if (req.user.id == video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedVideo);
        } else {
            next(createError(403, "you can update only your video"));
        }
    } catch (error) {
        next(error);
    }
};
export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    } catch (error) {
        next(error);
    }
};
export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        });
        res.status(200).json("the view has been increased");
    } catch (error) {
        next(error);
    }
};
export const random = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
};
export const trends = async (req, res, next) => {
    try {
        const video = await Video.find().sort({ views: -1 });
        res.status(200).json(video);
    } catch (error) {
        next(error);
    }
};
export const subs = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChanel = user.subscribedUsers;
        const list = await Promise.all(
            subscribedChanel.map((chanelId) => {
                return Video.find({ userId: chanelId });
            })
        );
        res.status(200).json(
            list.flat().sort((a, b) => b.createdAt - a.createdAt)
        );
    } catch (error) {
        next(error);
    }
};
export const getByTags = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
        const video = await Video.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(video);
    } catch (error) {
        next(error);
    }
};
export const search = async (req, res, next) => {
    const search = req.query.q;

    try {
        const video = await Video.find({
            title: { $regex: search, $options: "i" },
        }).limit(40);
        res.status(200).json(video);
    } catch (error) {
        next(error);
    }
};
