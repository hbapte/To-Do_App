import { Request, Response } from "express";
import { getAllTasks, createTask, getTaskById, updateTask, deleteTask } from "../repository/taskRepository";

export const getAllTasksController = async (req: Request, res: Response) => await getAllTasks(req, res);

export const createTaskController = async (req: Request, res: Response) => await createTask(req, res);

export const getTaskByIdController = async (req: Request, res: Response) => await getTaskById(req, res);

export const updateTaskController = async (req: Request, res: Response) => await updateTask(req, res);

export const deleteTaskController = async (req: Request, res: Response) => await deleteTask(req, res);
