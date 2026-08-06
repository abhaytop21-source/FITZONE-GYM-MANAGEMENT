import {
    registerGymService,
    loginGymService
} from "../services/auth.service.js";


export const registerGym = async (req, res) => {
  try {

    const result = await registerGymService(req.body);

    return res.status(201).json({

      success: true,

      message: "Gym registered successfully",

      token: result.token,

      gym: result.gym,

    });
    
  } catch (error) {

    return res.status(500).json({

      success: false,
      
      message: error.message,

    });
  }
};

export const loginGym = async (req, res) => {

    try {

        const result = await loginGymService(req.body);

        return res.status(200).json({

            success: true,

            message: "Login successful",

            token: result.token,

            gym: result.gym

        });

    } catch (error) {

        return res.status(401).json({

            success: false,

            message: error.message

        });

    }

};

