import express from "express";
import {
    addvideo,
    addView,
    deleteVideo,
    getByTags,
    getVideo,
    random,
    search,
    subs,
    trends,
    updateVideo,
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();
// add video

router.post("/", verifyToken, addvideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);
router.get("/trends", trends);
router.get("/random", random);
router.get("/subs", verifyToken, subs);
router.get("/tags", getByTags);
router.get("/search", search);

export default router;
