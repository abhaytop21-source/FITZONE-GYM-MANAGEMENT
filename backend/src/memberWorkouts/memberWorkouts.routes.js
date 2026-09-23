import express from "express";

import {
    getMemberWorkouts,
    createMemberWorkout,
    getWorkoutLibrary,
    getWorkoutLibraryDetails,
    selectWorkoutTemplate
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

// =====================================================
// GET WORKOUT LIBRARY
// =====================================================

router.get(
    "/library",
    verifyToken,
    getWorkoutLibrary
);


// =====================================================
// GET WORKOUT LIBRARY DETAILS
// =====================================================

router.get(
    "/library/:id",
    verifyToken,
    getWorkoutLibraryDetails
);

// =====================================================
// WORKOUT LIBRARY
// =====================================================

router.get(
    "/library",
    verifyToken,
    getWorkoutLibrary
);


// =====================================================
// WORKOUT LIBRARY DETAILS
// =====================================================

router.get(
    "/library/:id",
    verifyToken,
    getWorkoutLibraryDetails
);


// =====================================================
// SELECT WORKOUT FROM LIBRARY
// =====================================================

router.post(
    "/library/:id/select",
    verifyToken,
    selectWorkoutTemplate
);


// =====================================================
// GET MEMBER CURRENT WORKOUT
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