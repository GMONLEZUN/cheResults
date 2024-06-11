import { check } from "express-validator";
import { validateResults } from "../utils/handleValidator.js";

export const validatorCreateTournament = [
  check("title").exists().notEmpty().trim(),
  check("description").exists().notEmpty(),
  check("rounds").exists().notEmpty(),
  check("club").exists().notEmpty(),
  check("styleTournament").optional(),
  check("teamsTournament").optional().isBoolean(),
  check("teams").optional(),
  check("styleGame").exists().notEmpty(),
  check("location").optional().notEmpty(),
  check("arbiter").exists().notEmpty(),
  check("dateRounds").optional().isArray(),
  check("user").exists().notEmpty().isObject(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorGetTournament = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorDeleteTournament = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorUpdateTournament = [
  check("title").exists().notEmpty().trim(),
  check("description").exists().notEmpty(),
  check("rounds").exists().notEmpty(),
  check("club").exists().notEmpty(),
  check("styleTournament").exists().notEmpty(),
  check("teamsTournament").exists().notEmpty().isBoolean(),
  check("teams").optional(),
  check("styleGame").exists().notEmpty(),
  check("location").exists().notEmpty(),
  check("arbiter").exists().notEmpty(),
  check("dateRounds").exists().notEmpty().isArray(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorAddPlayersTournament = [
  check("id").exists().notEmpty().isMongoId(),
  check("players").exists().notEmpty().isArray().isLength({
    min: 1,
  }),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorDeletePlayerTournament = [
  check("id").exists().notEmpty().isMongoId(),
  check("pid").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorDeleteAllPlayersTournament = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
