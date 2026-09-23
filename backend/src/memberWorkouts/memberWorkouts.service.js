import prisma from "../config/prisma.js";


// =====================================================
// GET MEMBER WORKOUTS
// =====================================================

export const getMemberWorkoutsService = async (memberId) => {

    // -------------------------------------------------
    // Get the member's active workout plan
    // -------------------------------------------------

    const workoutPlan =
        await prisma.workoutPlan.findFirst({

            where: {
                memberId,
                status: "ACTIVE"
            },

            include: {

                exercises: {

                    orderBy: {
                        orderIndex: "asc"
                    },

                    include: {

                        exercise: true

                    }

                }

            },

            orderBy: {
                updatedAt: "desc"
            }

        });


    // -------------------------------------------------
    // Get recent workout sessions
    // -------------------------------------------------

    const recentSessions =
        await prisma.workoutSession.findMany({

            where: {
                memberId
            },

            orderBy: {
                sessionDate: "desc"
            },

            take: 10,

            include: {

                workout: {

                    select: {

                        id: true,
                        name: true,
                        goal: true

                    }

                }

            }

        });


    return {

        workout: workoutPlan,

        recentSessions

    };

};

// =====================================================
// CREATE MEMBER WORKOUT
// =====================================================

export const createMemberWorkoutService = async (
    memberId,
    workoutData
) => {

    const {
        name,
        description,
        goal,
        exercises
    } = workoutData;


    // -------------------------------------------------
    // Basic validation
    // -------------------------------------------------

    if (!name || !name.trim()) {

        throw new Error(
            "Workout name is required."
        );

    }


    if (
        !Array.isArray(exercises) ||
        exercises.length === 0
    ) {

        throw new Error(
            "At least one exercise is required."
        );

    }


    // -------------------------------------------------
    // Validate exercises
    // -------------------------------------------------

    for (const exercise of exercises) {

        if (!exercise.exerciseId) {

            throw new Error(
                "Every workout exercise must have an exerciseId."
            );

        }


        if (
            exercise.sets !== undefined &&
            exercise.sets !== null &&
            (
                !Number.isInteger(
                    Number(exercise.sets)
                ) ||
                Number(exercise.sets) <= 0
            )
        ) {

            throw new Error(
                "Sets must be a positive integer."
            );

        }


        if (
            exercise.reps !== undefined &&
            exercise.reps !== null &&
            (
                !Number.isInteger(
                    Number(exercise.reps)
                ) ||
                Number(exercise.reps) <= 0
            )
        ) {

            throw new Error(
                "Reps must be a positive integer."
            );

        }


        if (
            exercise.restSeconds !== undefined &&
            exercise.restSeconds !== null &&
            (
                !Number.isInteger(
                    Number(exercise.restSeconds)
                ) ||
                Number(exercise.restSeconds) < 0
            )
        ) {

            throw new Error(
                "Rest time must be a valid number."
            );

        }

    }


    // -------------------------------------------------
    // Verify that all exercises exist
    // -------------------------------------------------

    const exerciseIds =
        exercises.map(
            exercise =>
                Number(
                    exercise.exerciseId
                )
        );


    const existingExercises =
        await prisma.exercise.findMany({

            where: {

                id: {
                    in: exerciseIds
                }

            },

            select: {
                id: true
            }

        });


    const existingExerciseIds =
        new Set(
            existingExercises.map(
                exercise => exercise.id
            )
        );


    for (const exerciseId of exerciseIds) {

        if (
            !existingExerciseIds.has(
                exerciseId
            )
        ) {

            throw new Error(
                `Exercise with ID ${exerciseId} does not exist.`
            );

        }

    }


    // -------------------------------------------------
    // Create workout in a transaction
    // -------------------------------------------------

    const workout =
        await prisma.$transaction(
            async (tx) => {

                // -------------------------------------
                // Deactivate existing active workouts
                // -------------------------------------

                await tx.workoutPlan.updateMany({

                    where: {
                        memberId,
                        status: "ACTIVE"
                    },

                    data: {
                        status: "INACTIVE"
                    }

                });


                // -------------------------------------
                // Create new workout
                // -------------------------------------

                const newWorkout =
                    await tx.workoutPlan.create({

                        data: {

                            memberId,

                            name:
                                name.trim(),

                            description:
                                description ||
                                null,

                            goal:
                                goal ||
                                null,

                            status:
                                "ACTIVE",

                            exercises: {

                                create:
                                    exercises.map(
                                        (
                                            exercise,
                                            index
                                        ) => ({

                                            exerciseId:
                                                Number(
                                                    exercise.exerciseId
                                                ),

                                            sets:
                                                exercise.sets !==
                                                undefined
                                                    ? Number(
                                                        exercise.sets
                                                    )
                                                    : null,

                                            reps:
                                                exercise.reps !==
                                                undefined
                                                    ? Number(
                                                        exercise.reps
                                                    )
                                                    : null,

                                            duration:
                                                exercise.duration !==
                                                undefined
                                                    ? Number(
                                                        exercise.duration
                                                    )
                                                    : null,

                                            restSeconds:
                                                exercise.restSeconds !==
                                                undefined
                                                    ? Number(
                                                        exercise.restSeconds
                                                    )
                                                    : null,

                                            orderIndex:
                                                exercise.orderIndex !==
                                                undefined
                                                    ? Number(
                                                        exercise.orderIndex
                                                    )
                                                    : index + 1

                                        })
                                    )

                            }

                        },

                        include: {

                            exercises: {

                                orderBy: {
                                    orderIndex: "asc"
                                },

                                include: {
                                    exercise: true
                                }

                            }

                        }

                    });


                return newWorkout;

            }
        );


    return workout;

};

// =====================================================
// GET WORKOUT LIBRARY
// =====================================================

export const getWorkoutLibraryService = async () => {

    const workouts =
        await prisma.workoutTemplate.findMany({

            where: {
                status: "ACTIVE"
            },

            orderBy: [
                {
                    muscleGroup: "asc"
                },
                {
                    difficulty: "asc"
                },
                {
                    name: "asc"
                }
            ],

            include: {

                exercises: {

                    orderBy: {
                        orderIndex: "asc"
                    },

                    include: {
                        exercise: true
                    }

                }

            }

        });

    return workouts;
};


// =====================================================
// GET SINGLE WORKOUT FROM LIBRARY
// =====================================================

export const getWorkoutLibraryDetailsService =
    async (workoutId) => {

        const workout =
            await prisma.workoutTemplate.findFirst({

                where: {
                    id: Number(workoutId),
                    status: "ACTIVE"
                },

                include: {

                    exercises: {

                        orderBy: {
                            orderIndex: "asc"
                        },

                        include: {
                            exercise: true
                        }

                    }

                }

            });

        if (!workout) {
            throw new Error(
                "Workout not found."
            );
        }

    return workout;

};

// =====================================================
// SELECT WORKOUT FROM LIBRARY
// =====================================================

export const selectWorkoutTemplateService = async (
    memberId,
    templateId
) => {

    const workoutTemplateId =
        Number(templateId);


    // -------------------------------------------------
    // Validate template ID
    // -------------------------------------------------

    if (
        !Number.isInteger(workoutTemplateId) ||
        workoutTemplateId <= 0
    ) {

        throw new Error(
            "Invalid workout template ID."
        );

    }


    // -------------------------------------------------
    // Get predefined workout template
    // -------------------------------------------------

    const workoutTemplate =
        await prisma.workoutTemplate.findFirst({

            where: {

                id: workoutTemplateId,

                status: "ACTIVE"

            },

            include: {

                exercises: {

                    orderBy: {

                        orderIndex: "asc"

                    },

                    include: {

                        exercise: true

                    }

                }

            }

        });


    if (!workoutTemplate) {

        throw new Error(
            "Workout template not found."
        );

    }


    // -------------------------------------------------
    // Make sure template has exercises
    // -------------------------------------------------

    if (
        !Array.isArray(
            workoutTemplate.exercises
        ) ||
        workoutTemplate.exercises.length === 0
    ) {

        throw new Error(
            "This workout does not contain any exercises."
        );

    }


    // -------------------------------------------------
    // Create member workout in transaction
    // -------------------------------------------------

    const workout =
        await prisma.$transaction(
            async (tx) => {


                // -------------------------------------
                // Deactivate current active workout
                // -------------------------------------

                await tx.workoutPlan.updateMany({

                    where: {

                        memberId,

                        status: "ACTIVE"

                    },

                    data: {

                        status: "INACTIVE"

                    }

                });


                // -------------------------------------
                // Create new member workout
                // -------------------------------------

                const newWorkout =
                    await tx.workoutPlan.create({

                        data: {

                            memberId,

                            name:
                                workoutTemplate.name,

                            description:
                                workoutTemplate.description ||
                                null,

                            goal:
                                workoutTemplate.goal ||
                                null,

                            status:
                                "ACTIVE",

                            exercises: {

                                create:
                                    workoutTemplate.exercises.map(
                                        templateExercise => ({

                                            exerciseId:
                                                templateExercise.exerciseId,

                                            sets:
                                                templateExercise.sets,

                                            reps:
                                                templateExercise.reps,

                                            duration:
                                                templateExercise.duration,

                                            restSeconds:
                                                templateExercise.restSeconds,

                                            orderIndex:
                                                templateExercise.orderIndex

                                        })
                                    )

                            }

                        },

                        include: {

                            exercises: {

                                orderBy: {

                                    orderIndex: "asc"

                                },

                                include: {

                                    exercise: true

                                }

                            }

                        }

                    });


                return newWorkout;

            }
        );


    return workout;

};