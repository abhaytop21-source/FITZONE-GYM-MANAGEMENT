import express from "express";

import {
    getMemberDashboard
} from "./memberDashboard.controller.js";

import verifyToken from "../middleware/verifyToken.js";


const router = express.Router();


// =====================================================
// MEMBER DASHBOARD
// =====================================================

router.get(
    "/",
    verifyToken,
    getMemberDashboard
);


export default router;