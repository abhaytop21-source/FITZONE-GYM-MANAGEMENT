import {
    getMemberDashboardService
} from "./memberDashboard.service.js";


// =====================================================
// GET MEMBER DASHBOARD
// =====================================================

export const getMemberDashboard = async (req, res) => {

    try {

        const memberId = req.user.id;


        const data =
            await getMemberDashboardService(memberId);


        res.status(200).json({

            success: true,

            data

        });


    } catch (error) {

        console.error(
            "Member dashboard error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to load member dashboard."

        });

    }

};