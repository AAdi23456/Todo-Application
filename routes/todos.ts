import express, { Request, Response,Router } from "express";
import { getTask, updateTask, deleteTask, createTask } from "../controllers/todos";
import { authenticationMiddleware } from "../middleware/authentication";

const router:Router = express.Router();

router.get("/tasks",authenticationMiddleware as any,getTask as any);
router.put("/update/task", authenticationMiddleware as any, updateTask as any);
router.delete("/delete", authenticationMiddleware as any, deleteTask as any);
router.post("/create", authenticationMiddleware as any, createTask as any);

export default router;
