import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/user.middleware.js";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.post("logout", verifyJWT, logoutUser);

export default router;
