import express from "express";
import {forgotPassword, resetPassword, refreshToken, getUser} from "../controllers/user.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/refresh-token", refreshToken);
router.get("/auth", tokenMiddleware.auth, getUser);

export default router;
