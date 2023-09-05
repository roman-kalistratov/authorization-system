import express from "express";
import { login, sendLoginCode, register, logout, loginWithCode } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/send-code", sendLoginCode);
router.post("/login-with-code", loginWithCode);
router.post("/register", register);
router.post("/logout", logout);

export default router;
