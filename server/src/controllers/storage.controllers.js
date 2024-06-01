import { storageModel } from "../models/storage.model.js";
import { usersModel } from "../models/users.models.js";
import fs from "node:fs";
import { storagePath } from "../utils/path.js";
import { matchedData } from "express-validator";

const PUBLIC_URL = process.env.PUBLIC_URL;

export const createItem = async (req, res) => {
  const { file, user } = matchedData(req);
  if (!user) return res.status(403).json({ message: "You must be authenticated" });
  if (!file) return res.status(500).json({ message: "File not found" });
  const fileData = {
    filename: file.filename,
    url: `${PUBLIC_URL}/${file.filename}`,
  };
  const response = await storageModel.create(fileData);
  const updateUser = await usersModel.findByIdAndUpdate(user._id, { avatar: response._id }, { new: true });
  return res.status(201).json({ message: "File created successfully", response, updateUser });
};

export const getItem = async () => {
  const { id } = matchedData(req);
  const data = await storageModel.findById(id);
  return res.status(200).json({ data });
};

export const deleteItem = async () => {
  const { id } = matchedData(req);
  const data = await storageModel.findByIdAndDelete(id);
  const filename = data.filename;
  fs.unlinkSync(`${storagePath}/${filename}`);
  return res.status(200).json({ data });
};
