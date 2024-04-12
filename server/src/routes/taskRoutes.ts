import express from "express";
import { getAllTasks, createTask, getTaskById, updateTask, deleteTask } from "../controllers/taskController";

const router = express.Router();

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
