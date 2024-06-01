import { check } from "express-validator";
import { validateResults } from "../utils/handleValidator.js";

export const validatorRegister = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty(),
  check("name").exists().notEmpty().isString(),
  check("age").exists().notEmpty().isInt({ min: 0, max: 120 }),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

export const validatorChPw = [
  check("email").exists().notEmpty().isEmail(),
  check("oldPassword").exists().notEmpty(),
  check("newPassword").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
export const validatorLogin = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
export const validatorChRole = [
  check("email").exists().notEmpty().isEmail(),
  check("role").exists().notEmpty().isString(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
export const validatorRvalidate = [
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
