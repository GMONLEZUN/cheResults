import { matchedData } from "express-validator";
import { PlayersModel } from "../models/players.models.js";

export const getAllPlayers = async (req, res) => {
  try {
    const { search } = req.query;
    if (search) {
      const searchParam = search.toLowerCase().trim();
      console.log(searchParam);
      const players = [];
      players.push(...(await PlayersModel.find({ name: searchParam, lastname: searchParam, fide_code: searchParam, national_code: searchParam })));
      return res.status(200).json({ players });
    }
    const players = await PlayersModel.find({});
    return res.status(200).json({ players });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPlayerById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const player = await PlayersModel.findById(id);
    if (!player) return res.status(404).json({ message: "Player not found" });
    return res.status(200).json({ player });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong, invalid id" });
  }
};

export const createPlayer = async (req, res) => {
  try {
    const { name, lastname, elo_rating, nac_rating, federation, fide_code, nac_code } = matchedData(req);
    const newPlayer = {
      name: name.toLowerCase().trim(),
      lastname: lastname.toLowerCase().trim(),
      elo_rating,
      nac_rating,
      federation,
      fide_code,
      nac_code,
    };
    const response = await PlayersModel.create(newPlayer);
    return res.status(200).json({ message: "Created successfully", response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updatePlayer = async (req, res) => {
  try {
    const { id, name, lastname, elo_rating, nac_rating, federation, fide_code, nac_code } = matchedData(req);
    const playerExist = await PlayersModel.findById(id);
    if (!playerExist) return res.status(404).json({ message: "Player not found" });
    const updatedPlayer = {
      name,
      lastname,
      elo_rating,
      nac_rating,
      federation,
      fide_code,
      nac_code,
    };
    const response = await PlayersModel.findByIdAndUpdate(id, updatedPlayer);
    const updated = await PlayersModel.findById(id);
    return res.status(200).json({ message: "Updated successfully", old: response, new: updated });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deletePlayer = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const playerExist = await PlayersModel.findById(id);
    if (!playerExist) return res.status(404).json({ message: "Player not found" });
    const response = await PlayersModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Deleted successfully", response });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
