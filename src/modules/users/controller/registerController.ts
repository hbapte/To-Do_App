import { Request, Response } from 'express';
import sendVerificationEmail from '../../users/utils/sendVerificationEmail';
import { findUserByEmailOrUsername, createUser } from "../repository/registerRepository";

const registerController = async (req: Request, res: Response) => {
  const { names, email, username, password } = req.body;
  try {
    // Check if the email or username already exists
    const existingUser = await findUserByEmailOrUsername(email, username);
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    // Generate a verification token
    const verificationToken = Math.random().toString(36).substring(7);

    // Create a new user
    await createUser(names, email, username, password, verificationToken);

    // Send the verification email
    await sendVerificationEmail(email, verificationToken, names);

    res.status(201).json({ message: "User registered successfully. Please check your email for verification." });
    console.log("User created successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default registerController;
