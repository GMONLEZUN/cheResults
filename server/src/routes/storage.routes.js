import { Router } from "express";
import { uploadAvatarMiddleware } from "../utils/handleAvatarStorage.js";
import { createItem, deleteItem, getItem } from "../controllers/storage.controllers.js";
import { authMiddleware } from "../middlewares/session.js";
import { validatorDeleteElementStorage, validatorGetElementStorage } from "../validators/storage.validator.js";

const router = Router();

router.post("/", authMiddleware, uploadAvatarMiddleware.single("avatar"), createItem);
router.get("/:id", authMiddleware, validatorGetElementStorage, getItem);
router.delete("/:id", authMiddleware, validatorDeleteElementStorage, deleteItem);

export default router;
