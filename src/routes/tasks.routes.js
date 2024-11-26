import { Router } from "express";
import tasksControllers from "../controllers/tasks.controllers.js";

const router=Router();

router
.route('/')
.get(tasksControllers.getTasks)
.post(tasksControllers.createTask);

router
.route('/:id')
.get(tasksControllers.getTask)
.put(tasksControllers.updateTask)
.delete(tasksControllers.deleteTask)
.patch(tasksControllers.TaskDone);

export default router;