import express from "express";
import {
    deleteUser,
    dislike,
    getUser,
    like,
    subscribe,
    unsubscribe,
    update,
} from "../controllers/users.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();
// get user
router.get("/find/:id", getUser);
// update
router.put("/:id", verifyToken, update);
// delete
router.delete("/:id", verifyToken, deleteUser);

// subscribe
router.put("/sub/:id", verifyToken, subscribe);
// unsubscribe
router.put("/unsub/:id", verifyToken, unsubscribe);

// like
router.put("/likes/:videoId", verifyToken, like);
// dislike
router.put("/dislikes/:videoId", verifyToken, dislike);

export default router;
