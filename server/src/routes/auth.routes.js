import { Router } from "express";
import { changeRole, checkToken, resendValidate, userChangePassword, userLogin, userRegister, userValidation } from "../controllers/auth.controllers.js";
import { validatorChPw, validatorChRole, validatorLogin, validatorRegister, validatorRvalidate } from "../validators/auth.validator.js";

const router = Router();

router.post("/register", validatorRegister, userRegister);
router.post("/login", validatorLogin, userLogin);
router.post("/validate/:token", userValidation);
router.put("/chpw", validatorChPw, userChangePassword);
router.put("/chrole", validatorChRole, changeRole);
router.post("/resendvalidate", validatorRvalidate, resendValidate);
router.post("/checkToken", checkToken);

export default router;
