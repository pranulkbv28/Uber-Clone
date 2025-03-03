import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getUserProfile,
} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.post("logout", verifyJWT, logoutUser);
router.get("/profile", verifyJWT, getUserProfile);

export default router;
