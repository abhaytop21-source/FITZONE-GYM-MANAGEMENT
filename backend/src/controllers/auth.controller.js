import { registerGymService } from "../services/auth.service.js";

export const registerGym = async (req, res) => {
  try {
    const result = await registerGymService(req.body);

    return res.status(201).json({
      success: true,
      message: "Gym registered successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};