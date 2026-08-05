import jwt from "jsonwebtoken";

export const generateToken = (gym) => {
    return jwt.sign(
        {
            id: gym.id,
            gymCode: gym.gymCode,
            ownerEmail: gym.ownerEmail
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
};