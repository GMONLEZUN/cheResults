import { matchedData } from "express-validator";
import { TournamentsModel } from "../models/tournaments.models.js";

export const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await TournamentsModel.find({});
    return res.status(200).json({ tournaments });
  } catch (error) {
    console.log(error);
  }
};

export const getTournamentDetail = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const tournament = await TournamentsModel.findById(id);
    console.log(tournament);
    if (!tournament) {
      return res.status(404).json({ message: "No such tournament" });
    }
    return res.status(200).json({ tournament });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Invalid id tournament", error });
  }
};

export const createTournament = async (req, res) => {
  try {
    const { title, rounds, club, styleTournament, teamsTournament, teams, styleGame, location, arbiter, dateRounds } = matchedData(req);
    const newTournament = {
      title,
      rounds,
      club,
      styleTournament,
      teamsTournament,
      teams,
      styleGame,
      location,
      arbiter,
      dateRounds,
    };
    const response = await TournamentsModel.create(newTournament);
    return res.status(201).json({ message: `Created successfully the tournament with id: ${response._id}`, response });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

export const updateTournament = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const tournamentExists = await TournamentsModel.findById(id);
    if (!tournamentExists) return res.status(404).json({ message: "No such tournament" });
    const { title, rounds, club, styleTournament, teamsTournament, teams, styleGame, location, arbiter, dateRounds } = matchedData(req);
    const updatedData = {
      title,
      rounds,
      club,
      styleTournament,
      teamsTournament,
      teams,
      styleGame,
      location,
      arbiter,
      dateRounds,
    };
    const response = await TournamentsModel.findByIdAndUpdate(id, updatedData);
    const updatedTournament = await TournamentsModel.findById(id);
    return res.status(200).json({ message: "updated successfully", old: response, new: updatedTournament });
  } catch (error) {
    return res.status(500).json({ message: "Invalid id tournament", error });
  }
};

export const deleteTournament = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const tournamentExists = await TournamentsModel.findById(id);
    if (!tournamentExists) return res.status(404).json({ message: "No such tournament" });
    const response = await TournamentsModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Deleted successfully", response });
  } catch (error) {
    return res.status(500).json({ message: "Invalid id tournament", error });
  }
};

export const addTournamentPlayers = async (req, res) => {
  try {
    const { id, players } = matchedData(req);
    const tournament = await TournamentsModel.findById(id);
    if (!tournament) return res.status(404).json({ message: "No such tournament" });
    const updatePlayers = [...tournament.players, ...players];
    console.log({ players });
    console.log({ updatePlayers });
    const response = await TournamentsModel.findByIdAndUpdate(id, { players: updatePlayers });
    const updatedTournament = await TournamentsModel.findById(id);
    return res.status(200).json({ message: `Updated tournament id: ${response._id}`, old: response, new: updatedTournament });
  } catch (error) {
    console.log(error);
  }
};

export const deletePlayerFromTournament = async (req, res) => {
  try {
    const { id, pid } = matchedData(req);
    const tournament = await TournamentsModel.findById(id);
    if (!tournament) return res.status(404).json({ message: "No such tournament" });
    const playerExist = tournament.players.findIndex((player) => player._id == pid);
    if (playerExist === -1) return res.status(404).json({ message: "No such player in this tournament" });
    const updatePlayers = tournament.players.filter((player) => player._id != pid);
    const response = await TournamentsModel.findByIdAndUpdate(id, { players: updatePlayers });
    const updatedTournament = await TournamentsModel.findById(id);
    return res.status(200).json({ message: `Updated tournament id: ${response._id}, deleted player: ${pid}`, old: response.players, new: updatedTournament.players });
  } catch (error) {
    return res.status(500).json({ message: "Invalid id tournament", error });
  }
};

export const deleteAllplayersFromTournament = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const tournament = await TournamentsModel.findById(id);
    if (!tournament) return res.status(404).json({ message: "No such tournament" });
    const updatePlayers = [];
    const response = await TournamentsModel.findByIdAndUpdate(id, { players: updatePlayers });
    const updatedTournament = await TournamentsModel.findById(id);
    return res.status(200).json({ message: `Updated tournament id: ${response._id}`, old: response.players, new: updatedTournament.players });
  } catch (error) {
    return res.status(500).json({ message: "Invalid id tournament", error });
  }
};
