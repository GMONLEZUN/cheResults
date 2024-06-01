import { Router } from "express";
import { createPlayer, deletePlayer, getAllPlayers, getPlayerById, updatePlayer } from "../controllers/players.controllers.js";
import { validatorCreatePlayer, validatorDeletePlayer, validatorGetPlayer, validatorUpdatePlayer } from "../validators/players.validator.js";
import { authMiddleware } from "../middlewares/session.js";

const router = Router();

router.get("/", authMiddleware, getAllPlayers);
router.get("/:id", validatorGetPlayer, getPlayerById);
router.put("/:id", validatorUpdatePlayer, updatePlayer);
router.delete("/:id", validatorDeletePlayer, deletePlayer);
router.post("/", validatorCreatePlayer, createPlayer);

export default router;
