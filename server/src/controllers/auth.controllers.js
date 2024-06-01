import { usersModel } from "../models/users.models.js";
import { tokenSign, tokenVerify } from "../utils/handleJWT.js";
import { comparePw, encryptPw } from "../utils/handlePassword.js";
import { mailRegistration } from "../utils/handleMail.js";
import { matchedData } from "express-validator";

export const userRegister = async (req, res) => {
  try {
    const { email, password, name, age } = matchedData(req);
    const emailExists = await usersModel.findOne({ email: email });
    if (emailExists) return res.status(400).json({ message: "Email alredy in use" });
    const passwordHash = await encryptPw(password);
    const newUser = {
      email,
      password: passwordHash,
      name,
      age,
    };
    const dataUser = await usersModel.create(newUser);
    dataUser.set("password", undefined);
    const token = await tokenSign(dataUser);
    const data = {
      user: dataUser,
      token,
    };
    mailRegistration(data);
    return res.status(201).json({ message: "Created successfully", data });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const userValidation = async (req, res) => {
  try {
    const { token } = req.params;
    const dataToken = await tokenVerify(token);
    if (!dataToken._id) {
      return res.status(401).json({ message: "No token Id" });
    }
    const response = await usersModel.findByIdAndUpdate(dataToken._id, { validated: true }, { new: true });
    return res.status(200).json({ message: "Updated successfully", response });
  } catch (error) {
    return res.status(500).json({ message: "Invalid token" });
  }
};

export const checkToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await tokenVerify(token);
    if (!dataToken) return res.status(403).json({ message: "invalid or expired token" });
    return res.status(200).json(dataToken);
  } catch (error) {
    console.log("el error fue: " + error);
  }
};

export const userChangePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = matchedData(req);
  const user = await usersModel.findOne({ email: email }).select("email password role validated");
  if (!user) return res.status(404).json({ message: "User not found" });
  if (!user.validated) return res.status(403).json({ message: "User must be validated" });
  const passwordHash = user.password;
  const chkPassword = await comparePw(oldPassword, passwordHash);
  if (!chkPassword) return res.status(403).json({ message: "Invalid password" });
  const newPasswordHash = await encryptPw(newPassword);
  user.set("password", undefined, { strict: false });
  const response = await usersModel.findByIdAndUpdate(user._id, { password: newPasswordHash }, { new: true });
  return res.status(200).json({ message: "Password updated successfully", response });
};

export const userLogin = async (req, res) => {
  const { email, password } = matchedData(req);
  const user = await usersModel.findOne({ email: email }).select("email password role validated");
  if (!user) return res.status(404).json({ message: "User not found" });
  if (!user.validated) return res.status(403).json({ message: "User must be validated" });
  const chkPassword = await comparePw(password, user.password);
  if (!chkPassword) return res.status(403).json({ message: "Invalid password" });
  user.set("password", undefined, { strict: false });
  const token = await tokenSign(user);
  const data = {
    token,
    user,
  };
  return res.status(200).json({ message: "Authorized", data });
};

export const changeRole = async (req, res) => {
  try {
    const { email, role } = matchedData(req);
    const user = await usersModel.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User not found" });
    // Create a new user instance to trigger validation
    const updatedUser = new usersModel({ role: role });
    // Validate the new user instance
    const validationError = updatedUser.validateSync();
    if (validationError) {
      return res.status(400).json({ message: validationError.message });
    }
    const response = await usersModel.findByIdAndUpdate(user._id, { role: role }, { new: true });
    return res.status(200).json({ message: "Role changed successfully", response });
  } catch (error) {
    console.log(error);
    if (!user) return res.status(404).json({ message: error });
  }
};

export const resendValidate = async (req, res) => {
  const { email } = matchedData(req);
  const user = await usersModel.findOne({ email: email });
  if (!user) return res.status(404).json({ message: "User not found" });
  const token = await tokenSign(user);
  const data = {
    user,
    token,
  };
  mailRegistration(data);
};

export const updateAvatar = async (req, res) => {};
