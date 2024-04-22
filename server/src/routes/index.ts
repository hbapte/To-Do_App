import express from "express";
import authRouter from "./authRoutes";
import authMiddleware from "../middlewares/authMiddleware";
import taskRoutes from "./taskRoutes";

const router = express.Router();


// routes
router.use("/tasks",authMiddleware, taskRoutes);
router.use("/auth", authRouter);


export default router;
