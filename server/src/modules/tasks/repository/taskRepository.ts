import Task from "../../../database/models/task";
import { Request, Response } from "express";

// GET all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// POST a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { taskName } = req.body;
    const newTask = new Task({ name: taskName });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET a single task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// PUT update a task by ID
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskName, completed } = req.body;
    const updatedFields: { name?: string; completed?: boolean } = {};

    if (taskName) updatedFields.name = taskName;
    if (completed !== undefined) updatedFields.completed = completed;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE a task by ID
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
