import { getDashboardData } from "./dashboard.service.js";

export const dashboard = async (req, res) => {

    try {

        const gymId = req.user.id;

        const data = await getDashboardData(gymId);

        res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to load dashboard."
        });

    }

};