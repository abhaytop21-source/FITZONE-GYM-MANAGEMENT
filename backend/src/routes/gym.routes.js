import express from "express";

import {
    getGymSettings,
    updateGymSettings,
    updateOwnerProfile,
    updateGymPassword
} from "../controllers/gym.controller.js";

import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get(
    "/settings",
    verifyToken,
    getGymSettings
);

router.put(
    "/password",
    verifyToken,
    updateGymPassword
);

router.put(
    "/settings",
    verifyToken,
    updateGymSettings
);

router.put(
    "/owner-profile",
    verifyToken,
    updateOwnerProfile
);

export default router;