import {
    getMemberProfileService,
    updatePersonalProfileService,
    updateFitnessProfileService
} from "../services/profile.service.js";


// ==========================================
// GET PROFILE
// ==========================================

export const getMemberProfile = async (req, res) => {

    try {

        const profile = await getMemberProfileService(
            req.user.id
        );

        res.status(200).json({
            success: true,
            profile
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }
};


// ==========================================
// UPDATE PERSONAL INFORMATION
// ==========================================

export const updatePersonalProfile = async (req, res) => {

    try {

        const profile = await updatePersonalProfileService(
            req.user.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Personal information updated successfully.",
            profile
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};


// ==========================================
// UPDATE FITNESS INFORMATION
// ==========================================

export const updateFitnessProfile = async (req, res) => {

    try {

        const profile = await updateFitnessProfileService(
            req.user.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Fitness information updated successfully.",
            profile
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};