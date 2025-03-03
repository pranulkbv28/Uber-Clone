import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getUserProfile,
} from "../controllers/user.controller.js";
import verifyJWTUser from "../middlewares/user.middleware.js";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.post("logout", verifyJWTUser, logoutUser);
router.get("/profile", verifyJWTUser, getUserProfile);

export default router;
