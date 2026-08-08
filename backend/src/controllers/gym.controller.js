import {
    getGymSettingsService,
    updateGymSettingsService,
    updateGymPasswordService,
    updateOwnerProfileService
} from "../services/gym.service.js";

// Get Gym Settings Service
export const getGymSettings = async (req, res) => {

    try {

        const gym = await getGymSettingsService(req.user.id);

        return res.status(200).json({
            success: true,
            gym
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message
        });

    }

};

// update Gym Password controller
export const updateGymPassword = async (req, res) => {

    try {

        const {
            currentPassword,
            newPassword,
            confirmPassword
        } = req.body;

        // Check required fields
        if (!currentPassword || !newPassword || !confirmPassword) {

            return res.status(400).json({
                success: false,
                message: "All password fields are required."
            });

        }

        // Check new password confirmation
        if (newPassword !== confirmPassword) {

            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match."
            });

        }

        // Basic password length check
        if (newPassword.length < 8) {

            return res.status(400).json({
                success: false,
                message: "New password must be at least 8 characters long."
            });

        }

        await updateGymPasswordService(
            req.user.id,
            currentPassword,
            newPassword
        );

        return res.status(200).json({
            success: true,
            message: "Password updated successfully."
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }

};


export const updateGymSettings = async (req, res) => {

    try {

        const {
            gymName,
            address,
            gymPhone,
            gymEmail
        } = req.body;

        if (!gymName || !address || !gymPhone || !gymEmail) {

            return res.status(400).json({
                success: false,
                message: "Please fill all gym information fields."
            });

        }

        const updatedGym = await updateGymSettingsService(
            req.user.id,
            {
                gymName: gymName.trim(),
                address: address.trim(),
                gymPhone: gymPhone.trim(),
                gymEmail: gymEmail.trim()
            }
        );

        return res.status(200).json({
            success: true,
            message: "Gym information updated successfully.",
            gym: updatedGym
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================================
// UPDATE OWNER PROFILE
// ==========================================

export const updateOwnerProfile = async (req, res) => {

    try {

        const {
            ownerName,
            ownerEmail
        } = req.body;

        if (!ownerName || !ownerEmail) {

            return res.status(400).json({
                success: false,
                message: "Owner name and email are required."
            });

        }

        const updatedGym = await updateOwnerProfileService(
            req.user.id,
            ownerName.trim(),
            ownerEmail.trim().toLowerCase()
        );

        return res.status(200).json({

            success: true,

            message: "Owner profile updated successfully.",

            gym: updatedGym

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};