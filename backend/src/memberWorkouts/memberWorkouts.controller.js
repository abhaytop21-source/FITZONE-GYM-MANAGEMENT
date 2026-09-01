import {
    getMemberWorkoutsService,
    createMemberWorkoutService
} from "./memberWorkouts.service.js";


// =====================================================
// GET MEMBER WORKOUTS
// =====================================================

export const getMemberWorkouts = async (req, res) => {

    try {

        const memberId = req.user.id;


        const data =
            await getMemberWorkoutsService(
                memberId
            );


        res.status(200).json({

            success: true,

            data

        });


    } catch (error) {

        console.error(
            "Member workouts error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to load member workouts."

        });

    }

};

// =====================================================
// CREATE MEMBER WORKOUT
// =====================================================

export const createMemberWorkout = async (
    req,
    res
) => {

    try {

        const memberId =
            req.user.id;


        const workout =
            await createMemberWorkoutService(
                memberId,
                req.body
            );


        res.status(201).json({

            success: true,

            message:
                "Workout created successfully.",

            data: {
                workout
            }

        });


    } catch (error) {

        console.error(
            "Create member workout error:",
            error
        );


        res.status(400).json({

            success: false,

            message:
                error.message ||
                "Failed to create workout."

        });

    }

};