import { Router } from "express";
import {
  addTournamentPlayers,
  createTournament,
  deleteAllplayersFromTournament,
  deletePlayerFromTournament,
  deleteTournament,
  getAllTournaments,
  getTournamentDetail,
  updateTournament,
} from "../controllers/tournaments.controllers.js";
import {
  validatorAddPlayersTournament,
  validatorCreateTournament,
  validatorDeleteAllPlayersTournament,
  validatorDeletePlayerTournament,
  validatorDeleteTournament,
  validatorGetTournament,
  validatorUpdateTournament,
} from "../validators/tournaments.validator.js";

const router = Router();

router.get("/", getAllTournaments);
router.get("/:id", validatorGetTournament, getTournamentDetail);
router.post("/", validatorCreateTournament, createTournament);
router.put("/:id", validatorUpdateTournament, updateTournament);
router.delete("/:id", validatorDeleteTournament, deleteTournament);

router.put("/:id/players", validatorAddPlayersTournament, addTournamentPlayers);
router.put("/:id/players/:pid", validatorDeletePlayerTournament, deletePlayerFromTournament);
router.delete("/:id/players/", validatorDeleteAllPlayersTournament, deleteAllplayersFromTournament);

export default router;
