import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import { generateMemberToken } from "../utils/generateMemberToken.js";

export const registerMemberService = async (data) => {
    const {
        email,
        password,
        fullName,
        phone
    } = data;

    // Check if member already exists
    const existingMember = await prisma.member.findUnique({
        where: {
            email
        }
    });

    if (existingMember) {
        throw new Error("Member email already registered.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create member account + profile
    const member = await prisma.member.create({
        data: {
            email,
            password: hashedPassword,

            profile: {
                create: {
                    fullName,
                    phone: phone || null
                }
            }
        },
        include: {
            profile: true
        }
    });

    // Generate member JWT
    const token = generateMemberToken(member);

    return {
        token,
        member: {
            id: member.id,
            email: member.email,
            status: member.status,
            profile: member.profile
        }
    };
};


export const loginMemberService = async (data) => {
    const {
        email,
        password
    } = data;

    // Find member
    const member = await prisma.member.findUnique({
        where: {
            email
        },
        include: {
            profile: true
        }
    });

    if (!member) {
        throw new Error("Member account not found.");
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(
        password,
        member.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password.");
    }

    // Check account status
    if (member.status !== "ACTIVE") {
        throw new Error("Member account is not active.");
    }

    // Generate JWT
    const token = generateMemberToken(member);

    return {
        token,
        member: {
            id: member.id,
            email: member.email,
            status: member.status,
            profile: member.profile
        }
    };
};