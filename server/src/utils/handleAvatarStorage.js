import multer from "multer";

import { __dirname, storagePath } from "./path.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${storagePath}/avatars`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const filename = `avatarFile-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = file.originalname.split(".").pop();
  const validExtensions = ["png", "jpg", "web3", "gif"];
  const valid = validExtensions.findIndex((extension) => extension === ext);
  if (valid === -1) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

export const uploadAvatarMiddleware = multer({
  storage,
  fileFilter,
});
