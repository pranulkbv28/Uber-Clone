import express from "express"
import { loginCaptain } from "../controllers/captain.controller";

const router = express.Router();

router.post("/create-captain", loginCaptain);

export default router;
