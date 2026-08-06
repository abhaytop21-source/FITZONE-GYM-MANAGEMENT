
import express from "express";
import { dashboard } from "./dashboard.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, dashboard);

export default router;