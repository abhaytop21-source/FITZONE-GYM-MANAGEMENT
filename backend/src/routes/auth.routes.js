import express from "express";
import { registerGym } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register-gym", registerGym);

export default router;