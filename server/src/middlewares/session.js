import { usersModel } from "../models/users.models.js";
import { tokenVerify } from "../utils/handleJWT.js";

export const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).json({ message: "No token found" });
    console.log(req);
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await tokenVerify(token);
    if (!dataToken?._id) return res.status(403).json({ message: "Invalid token" });
    const user = await usersModel.findById(dataToken._id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "error in authentication", error });
  }
};
