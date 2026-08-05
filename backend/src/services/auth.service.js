import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import { generateToken } from "../utils/generateToken.js";

export const registerGymService = async (data) => {
  const {
    gymName,
    gymType,
    ownerFirstName,
    ownerLastName,
    ownerEmail,
    ownerPhone,
    ownerPassword,
    gymEmail,
    gymPhone,
    address,
    city,
    state,
    country,
    openingTime,
    closingTime,
  } = data;

  // Check if owner email already exists
  const existingGym = await prisma.gym.findUnique({
    where: {
      ownerEmail,
    },
  });

  if (existingGym) {
    throw new Error("Owner email already registered.");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(ownerPassword, 10);

  // Generate Gym Code
  const totalGyms = await prisma.gym.count();

  const gymCode = `FIT${1001 + totalGyms}`;

  // Save Gym
  const gym = await prisma.gym.create({
    data: {
      gymCode,
      gymName,
      gymType,

      ownerFirstName,
      ownerLastName,
      ownerEmail,
      ownerPhone,
      ownerPassword: hashedPassword,

      gymEmail,
      gymPhone,

      address,
      city,
      state,
      country,

      openingTime,
      closingTime,
    },
  });

  const token = generateToken(gym);

  return {
    token,
    gym: {
      id: gym.id,
      gymCode: gym.gymCode,
      gymName: gym.gymName,
      ownerFirstName: gym.ownerFirstName,
      ownerLastName: gym.ownerLastName,
      ownerEmail: gym.ownerEmail,
    },
  };
};