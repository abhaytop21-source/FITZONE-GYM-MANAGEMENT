import express from "express";

import {
    getMemberWorkouts,
    createMemberWorkout
} from "./memberWorkouts.controller.js";

import verifyToken from "../middleware/verifyToken.js";


const router = express.Router();


// =====================================================
// GET MEMBER WORKOUTS
// =====================================================

router.get(
    "/",
    verifyToken,
    getMemberWorkouts
);

// =====================================================
// CREATE MEMBER WORKOUT
// =====================================================

router.post(
    "/",
    verifyToken,
    createMemberWorkout
);

export default router;