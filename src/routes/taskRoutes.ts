import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { getAllTasks, createTask, getTaskById, updateTask, deleteTask } from "../modules/tasks/repository/taskRepository";


const router = express.Router();

// Protect routes with authMiddleware
// router.use(authMiddleware);


// GET all tasks
router.get("/", getAllTasks);

// POST a new task
router.post("/", createTask);

// GET a single task by ID
router.get("/:id", getTaskById);

// PUT update a task by ID
router.put("/:id", updateTask);

// DELETE a task by ID
router.delete("/:id", deleteTask);

export default router;
