import express from "express";
import userController from "../controller/user-controller.js";
import checklistController from "../controller/checklist-controller.js";
import checklistItemController from "../controller/checklist-item-controller.js";
import {authMiddleware} from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// Contact API
userRouter.post('/api/checklists', checklistController.create);
userRouter.get('/api/checklists/:checklistId', checklistController.get);
userRouter.put('/api/checklists/:checklistId', checklistController.update);
userRouter.delete('/api/checklists/:checklistId', checklistController.remove);
userRouter.get('/api/checklists', checklistController.search);

// Address API
userRouter.post('/api/checklists/:checklistId/checklistItems', checklistItemController.create);
userRouter.get('/api/checklists/:checklistId/checklistItems/:checklistItemId', checklistItemController.get);
userRouter.put('/api/checklists/:checklistId/checklistItems/:checklistItemId', checklistItemController.update);
userRouter.delete('/api/checklists/:checklistId/checklistItems/:checklistItemId', checklistItemController.remove);
userRouter.get('/api/checklists/:checklistId/checklistItems', checklistItemController.list);

export {
    userRouter
}
