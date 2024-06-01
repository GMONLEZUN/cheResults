import { check } from "express-validator";
import { validateResults } from "../utils/handleValidator.js";

export const validatorGetElementStorage = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorDeleteElementStorage = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
