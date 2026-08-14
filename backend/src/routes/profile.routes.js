import express from "express";

import {
    getMemberProfile,
    updatePersonalProfile,
    updateFitnessProfile
} from "../controllers/profile.controller.js";

import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();


// Get complete profile
router.get(
    "/",
    verifyToken,
    getMemberProfile
);


// Update personal information
router.put(
    "/personal",
    verifyToken,
    updatePersonalProfile
);


// Update fitness information
router.put(
    "/fitness",
    verifyToken,
    updateFitnessProfile
);


export default router;