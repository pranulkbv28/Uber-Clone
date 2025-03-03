import express from "express"
import verifyJWT from "../middlewares/user.middleware.js";
import { getUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", verifyJWT, getUserProfile)

export default router