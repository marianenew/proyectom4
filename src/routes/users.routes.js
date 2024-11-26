import { Router } from "express";
import usersControllers from "../controllers/users.controllers.js";
import { authenticateToken } from "../middlewares/authenticate.middleware.js";

const router=Router();

router
.route('/')
.get(usersControllers.getUsers)
.post(usersControllers.createUsers);

router
.route('/:id')
.get(authenticateToken,usersControllers.getUser)
.put(authenticateToken,usersControllers.updateUser)
.patch(authenticateToken,usersControllers.activeInactive)
.delete(authenticateToken,usersControllers.deleteUser);

router
.get('/:id/tasks', authenticateToken,usersControllers.gerTasks);

export default router;

