import {
    getMemberWorkoutsService,
    createMemberWorkoutService,
    getWorkoutLibraryService,
    getWorkoutLibraryDetailsService,
    selectWorkoutTemplateService
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

// =====================================================
// GET WORKOUT LIBRARY
// =====================================================

export const getWorkoutLibrary = async (req, res) => {

    try {

        const workouts =
            await getWorkoutLibraryService();

        res.status(200).json({

            success: true,

            data: {
                workouts
            }

        });

    } catch (error) {

        console.error(
            "Workout library error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to load workout library."

        });

    }

};


// =====================================================
// GET WORKOUT LIBRARY DETAILS
// =====================================================

export const getWorkoutLibraryDetails =
    async (req, res) => {

        try {

            const workoutId =
                req.params.id;

            const workout =
                await getWorkoutLibraryDetailsService(
                    workoutId
                );

            res.status(200).json({

                success: true,

                data: {
                    workout
                }

            });

        } catch (error) {

            console.error(
                "Workout library details error:",
                error
            );

            res.status(404).json({

                success: false,

                message:
                    error.message ||
                    "Workout not found."

            });

        }

    };

// =====================================================
// SELECT WORKOUT FROM LIBRARY
// =====================================================

export const selectWorkoutTemplate = async (
    req,
    res
) => {

    try {

        const memberId =
            req.user.id;


        const templateId =
            req.params.id;


        const workout =
            await selectWorkoutTemplateService(
                memberId,
                templateId
            );


        res.status(201).json({

            success: true,

            message:
                "Workout selected successfully.",

            data: {

                workout

            }

        });


    } catch (error) {

        console.error(
            "Select workout error:",
            error
        );


        const message =
            error.message ||
            "Failed to select workout.";


        const statusCode =
            message.includes(
                "not found"
            )
                ? 404
                : 400;


        res.status(statusCode).json({

            success: false,

            message

        });

    }

};