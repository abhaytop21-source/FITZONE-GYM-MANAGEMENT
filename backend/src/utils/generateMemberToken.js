import jwt from "jsonwebtoken";

export const generateMemberToken = (member) => {
    return jwt.sign(
        {
            id: member.id,
            email: member.email,
            role: "MEMBER"
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
};