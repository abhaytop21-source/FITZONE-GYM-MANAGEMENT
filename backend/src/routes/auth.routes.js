import express from "express";
import { 
    registerGym, 
    loginGym 
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register-gym", registerGym);

router.post("/login", loginGym);

export default router;