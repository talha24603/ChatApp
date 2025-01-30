import { Router } from 'express';
import AuthController from '../Controller/AuthController.js';
import authMiddleware from '../middlewares/AuthMiddleware.js';
import ChatGroupController from '../Controller/chatGroupController.js';
import GroupUserController from '../Controller/groupUserController.js';
import ChatsController from '../Controller/chatsController.js';

const router = Router();

router.post("/auth/login", AuthController.login);

router.post("/chat-group", authMiddleware, ChatGroupController.store);
router.get("/chat-group", authMiddleware, ChatGroupController.index);
router.get("/chat-group/:id", ChatGroupController.show);
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update);
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.destroy);

router.post("/chat-group-users", GroupUserController.store);
router.get("/chat-group-users", GroupUserController.index);

router.get("/chats/:group_id", ChatsController.index);

export default router;