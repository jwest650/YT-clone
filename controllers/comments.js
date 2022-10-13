import { createError } from "../Error.js";
import Comments from "../models/Comments.js";
import Video from "../models/VideoSchema.js";

export const addComment = async (req, res, next) => {
    const newComment = new Comments({ ...req.body, userId: req.user.id });
    try {
        const comment = await newComment.save();
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
};
export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comments.findById(req.params.id);
        const video = await Video.findById(req.params.id);
        if (req.user.id == comment.userId || req.user.id == video.userId) {
            await Comments.findByIdAndDelete(req.params.id);
            res.status(200).json("comments deleted");
        } else {
            next(createError(403, "you can only delete you own comments"));
        }
    } catch (error) {
        next(error);
    }
};
export const getComment = async (req, res, next) => {
    try {
        const comments = await Comments.find({
            videoId: req.params.videoId,
        });
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};
