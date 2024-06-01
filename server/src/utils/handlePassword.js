import bcrypt from "bcrypt";

export const encryptPw = (plainPassword) => {
  const hash = bcrypt.hash(plainPassword, 10);
  return hash;
};

export const comparePw = async (plainPassword, passwordHashed) => {
  const result = await bcrypt.compare(plainPassword, passwordHashed);
  return result;
};
