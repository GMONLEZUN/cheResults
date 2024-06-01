import { check } from "express-validator";
import { validateResults } from "../utils/handleValidator.js";

export const validatorCreatePlayer = [
  check("name").exists().notEmpty().isString(),
  check("elo_rating").exists().notEmpty().isString(),
  check("lastname").exists().notEmpty().isInt({ min: 0, max: 3000 }),
  check("nac_rating").exists().notEmpty().isInt({ min: 0, max: 3000 }),
  check("federation").exists().notEmpty().isString().isLength({ min: 3, max: 3 }),
  check("fide_code").exists().notEmpty(),
  check("nac_code").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorGetPlayer = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorDeletePlayer = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
export const validatorUpdatePlayer = [
  check("name").exists().notEmpty().isString(),
  check("elo_rating").exists().notEmpty().isString(),
  check("lastname").exists().notEmpty().isInt({ min: 0, max: 3000 }),
  check("nac_rating").exists().notEmpty().isInt({ min: 0, max: 3000 }),
  check("federation").exists().notEmpty().isString().isLength({ min: 3, max: 3 }),
  check("fide_code").exists().notEmpty(),
  check("nac_code").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
