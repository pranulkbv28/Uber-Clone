import express from "express"
import { loginCaptain } from "../controllers/captain.controller";

const router = express.Router();

router.post("/captain-create", loginCaptain);

export default router;
