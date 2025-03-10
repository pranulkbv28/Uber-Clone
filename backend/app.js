import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";

dotenv.config({
  path: "./.env",
});

const app = express();
await connectDB();

const corsOptions = {};
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/captain", captainRoutes);

app.get("/", (_req, res) => {
  res.send("Hello World");
});

export default app;
