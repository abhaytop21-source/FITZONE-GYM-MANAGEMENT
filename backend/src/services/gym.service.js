

import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";


// Get Gym Settings Service
export const getGymSettingsService = async (gymId) => {

    const gym = await prisma.gym.findUnique({
        where: {
            id: gymId
        },
        select: {
            id: true,
            gymCode: true,
            gymName: true,
            gymType: true,

            ownerFirstName: true,
            ownerLastName: true,
            ownerEmail: true,
            ownerPhone: true,

            gymEmail: true,
            gymPhone: true,

            address: true,
            city: true,
            state: true,
            country: true,

            openingTime: true,
            closingTime: true
        }
    });

    if (!gym) {
        throw new Error("Gym not found.");
    }

    return gym;
};


export const updateGymPasswordService = async (
    gymId,
    currentPassword,
    newPassword
) => {

    // Find the logged-in gym
    const gym = await prisma.gym.findUnique({
        where: {
            id: gymId
        },
        select: {
            id: true,
            ownerPassword: true
        }
    });

    if (!gym) {
        throw new Error("Gym not found.");
    }

    // Check current password
    const isCurrentPasswordCorrect = await bcrypt.compare(
        currentPassword,
        gym.ownerPassword
    );

    if (!isCurrentPasswordCorrect) {
        throw new Error("Current password is incorrect.");
    }

    // Prevent using the same password
    const isSamePassword = await bcrypt.compare(
        newPassword,
        gym.ownerPassword
    );

    if (isSamePassword) {
        throw new Error(
            "New password must be different from your current password."
        );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update database
    await prisma.gym.update({
        where: {
            id: gymId
        },
        data: {
            ownerPassword: hashedPassword
        }
    });

    return true;
};

export const updateGymSettingsService = async (gymId, data) => {

    const {
        gymName,
        address,
        gymPhone,
        gymEmail
    } = data;

    const gym = await prisma.gym.findUnique({
        where: {
            id: gymId
        }
    });

    if (!gym) {
        throw new Error("Gym not found.");
    }

    const updatedGym = await prisma.gym.update({
        where: {
            id: gymId
        },
        data: {
            gymName,
            address,
            gymPhone,
            gymEmail
        },
        select: {
            id: true,
            gymCode: true,
            gymName: true,
            address: true,
            gymPhone: true,
            gymEmail: true
        }
    });

    return updatedGym;
};


// ==========================================
// UPDATE OWNER PROFILE
// ==========================================

export const updateOwnerProfileService = async (
    gymId,
    ownerName,
    ownerEmail
) => {

    const gym = await prisma.gym.findUnique({
        where: {
            id: gymId
        }
    });

    if (!gym) {
        throw new Error("Gym not found.");
    }

    // Split full name into first and last name
    const nameParts = ownerName.trim().split(/\s+/);

    const ownerFirstName = nameParts[0];

    const ownerLastName = nameParts
        .slice(1)
        .join(" ");

    // Check whether another gym is already using this email
    const existingOwner = await prisma.gym.findFirst({
        where: {
            ownerEmail,
            NOT: {
                id: gymId
            }
        }
    });

    if (existingOwner) {
        throw new Error("This owner email is already in use.");
    }

    const updatedGym = await prisma.gym.update({

        where: {
            id: gymId
        },

        data: {
            ownerFirstName,
            ownerLastName,
            ownerEmail
        },

        select: {
            id: true,
            gymCode: true,
            gymName: true,
            ownerFirstName: true,
            ownerLastName: true,
            ownerEmail: true
        }

    });

    return updatedGym;
};