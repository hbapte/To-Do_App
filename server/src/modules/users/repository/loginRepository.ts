import User from "../../../database/models/user";
const bcrypt = require("bcrypt");

export const findUserByEmailOrUsername = async (emailUsername: string) => {
  return await User.findOne({ $or: [{ email: emailUsername }, { username: emailUsername }] });
};

export const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};
