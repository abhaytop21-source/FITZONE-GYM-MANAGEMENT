import prisma from "../config/prisma.js";


// ==========================================
// GET MEMBER PROFILE
// ==========================================

export const getMemberProfileService = async (memberId) => {

    const profile = await prisma.memberProfile.findUnique({

        where: {
            memberId
        },

        include: {

            member: {
                select: {
                    email: true,
                    status: true
                }
            }

        }

    });


    if (!profile) {
        throw new Error("Member profile not found.");
    }


    return {

        ...profile,

        email: profile.member.email,

        status: profile.member.status

    };

};


// ==========================================
// UPDATE PERSONAL INFORMATION
// ==========================================

export const updatePersonalProfileService = async (memberId, data) => {

    const {
        fullName,
        phone,
        dateOfBirth,
        gender,
        location
    } = data;

    const profile = await prisma.memberProfile.update({
        where: {
            memberId
        },
        data: {
            ...(fullName !== undefined && {
                fullName
            }),

            ...(phone !== undefined && {
                phone
            }),

            ...(dateOfBirth !== undefined && {
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null
            }),

            ...(gender !== undefined && {
                gender
            }),

            ...(location !== undefined && {
                location
            })
        }
    });

    return profile;
};


// ==========================================
// UPDATE FITNESS INFORMATION
// ==========================================

export const updateFitnessProfileService = async (memberId, data) => {

    const {
        height,
        weight,
        fitnessGoal,
        experienceLevel,
        activityLevel,
        trainingDays,
        preferredWorkout,
        preferredTime,
        trainingFrequency
    } = data;

    const profile = await prisma.memberProfile.update({
        where: {
            memberId
        },
        data: {
            ...(height !== undefined && {
                height: height === null ? null : Number(height)
            }),

            ...(weight !== undefined && {
                weight: weight === null ? null : Number(weight)
            }),

            ...(fitnessGoal !== undefined && {
                fitnessGoal
            }),

            ...(experienceLevel !== undefined && {
                experienceLevel
            }),

            ...(activityLevel !== undefined && {
                activityLevel
            }),

            ...(trainingDays !== undefined && {
                trainingDays
            }),

            ...(preferredWorkout !== undefined && {
                preferredWorkout
            }),

            ...(preferredTime !== undefined && {
                preferredTime
            }),

            ...(trainingFrequency !== undefined && {
                trainingFrequency
            })
        }
    });

    return profile;
};