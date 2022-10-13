import jwt from "jsonwebtoken";
import { createError } from "./Error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "user not authenticated"));

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token invalid"));
        req.user = user;
        next();
    });
};
