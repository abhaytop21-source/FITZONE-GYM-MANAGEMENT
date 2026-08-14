import {
    registerMemberService,
    loginMemberService
} from "../services/memberAuth.service.js";

import prisma from "../config/prisma.js";


export const registerMember = async (req, res) => {
    try {
        const result = await registerMemberService(req.body);

        res.status(201).json({
            success: true,
            message: "Member registered successfully.",
            ...result
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


export const loginMember = async (req, res) => {
    try {
        const result = await loginMemberService(req.body);

        res.status(200).json({
            success: true,
            message: "Member login successful.",
            ...result
        });

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};


export const getCurrentMember = async (req, res) => {
    try {
        const member = await prisma.member.findUnique({
            where: {
                id: req.user.id
            },
            include: {
                profile: true
            }
        });

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Member not found."
            });
        }

        res.status(200).json({
            success: true,
            member: {
                id: member.id,
                email: member.email,
                status: member.status,
                profile: member.profile
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch member.",
            error: error.message
        });
    }
};