import prisma from "../config/prisma.js";

export const getDashboardData = async (gymId) => {

    return {
        totalMembers: 0,
        todayAttendance: 0,
        monthlyRevenue: 0,
        activeMemberships: 0
    };

};