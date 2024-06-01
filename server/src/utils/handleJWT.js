import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const tokenSign = async (user) => {
  const sign = await jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return sign;
};

export const tokenVerify = async (tokenJWT) => {
  try {
    return jwt.verify(tokenJWT, JWT_SECRET);
  } catch (error) {
    console.log("error:" + error);
    return null;
  }
};
