import User from "../../../database/models/user";
const bcrypt = require("bcrypt");

export const findUserByEmailOrUsername = async (email: string, username: string) => {
  return await User.findOne({ $or: [{ email }, { username }] });
};

export const createUser = async (names: string, email: string, username: string, password: string, emailVerificationToken: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ names, email, username, password: hashedPassword, emailVerificationToken });
  return await newUser.save();
};
