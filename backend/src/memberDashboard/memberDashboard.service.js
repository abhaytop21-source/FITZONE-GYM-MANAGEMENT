import prisma from "../config/prisma.js";


// =====================================================
// GET MEMBER DASHBOARD
// =====================================================

export const getMemberDashboardService = async (memberId) => {

    // -------------------------------------------------
    // Get member + profile
    // -------------------------------------------------

    const member = await prisma.member.findUnique({

        where: {
            id: memberId
        },

        include: {

            profile: true

        }

    });


    if (!member) {

        throw new Error("Member not found.");

    }


    // -------------------------------------------------
    // Get active workout plan
    // -------------------------------------------------

    const activeWorkoutPlan =
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


    // -------------------------------------------------
    // Get active goals
    // -------------------------------------------------

    const goals =
        await prisma.goal.findMany({

            where: {

                memberId,

                status: "ACTIVE"

            },

            orderBy: {

                deadline: "asc"

            }

        });


    // -------------------------------------------------
    // Get latest progress records
    // -------------------------------------------------

    const progressRecords =
        await prisma.progressRecord.findMany({

            where: {

                memberId

            },

            orderBy: {

                recordDate: "desc"

            },

            take: 10

        });


    // -------------------------------------------------
    // Get latest body measurements
    // -------------------------------------------------

    const measurements =
        await prisma.bodyMeasurement.findMany({

            where: {

                memberId

            },

            orderBy: {

                recordDate: "desc"

            },

            take: 10

        });


    // -------------------------------------------------
    // Get achievements
    // -------------------------------------------------

    const achievements =
        await prisma.memberAchievement.findMany({

            where: {

                memberId

            },

            include: {

                achievement: true

            },

            orderBy: {

                unlockedAt: "desc"

            }

        });


    // -------------------------------------------------
    // Get gym membership
    // -------------------------------------------------

    const membership =
        await prisma.gymMembership.findFirst({

            where: {

                memberId,

                status: "ACTIVE"

            },

            include: {

                gym: {

                    select: {

                        id: true,
                        gymCode: true,
                        gymName: true,
                        city: true,
                        state: true

                    }

                }

            },

            orderBy: {

                createdAt: "desc"

            }

        });


    // -------------------------------------------------
    // Return dashboard data
    // -------------------------------------------------

    return {

        member: {

            id: member.id,

            email: member.email,

            status: member.status

        },


        profile: member.profile,


        workoutPlan: activeWorkoutPlan,


        recentSessions,


        goals,


        progressRecords,


        measurements,


        achievements,


        membership

    };

};