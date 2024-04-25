import { Request, Response } from "express";
import { findUserByEmailOrUsername, comparePassword } from "../repository/loginRepository";
const jwt = require("jsonwebtoken");

const loginController = async (req: Request, res: Response) => {
  const { emailUsername, password, rememberMe } = req.body;
  try {
    const user = await findUserByEmailOrUsername(emailUsername);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const expiresIn = rememberMe ? "7d" : "1h";
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn });

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default loginController;
