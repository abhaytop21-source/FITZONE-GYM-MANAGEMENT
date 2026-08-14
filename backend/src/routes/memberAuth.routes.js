import express from "express";

import {
    registerMember,
    loginMember,
    getCurrentMember
} from "../controllers/memberAuth.controller.js";

import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", registerMember);

router.post("/login", loginMember);

router.get("/me", verifyToken, getCurrentMember);

export default router;