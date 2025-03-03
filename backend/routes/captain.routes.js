import express from "express";
import {
  getCaptainProfile,
  loginCaptain,
  logoutCaptain,
  registerCaptain,
} from "../controllers/captain.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-captain", registerCaptain);
router.post("login-captain", loginCaptain);
router.post("logout-captain", verifyJWT, logoutCaptain);
router.get("/profile-captain", verifyJWT, getCaptainProfile);

export default router;
