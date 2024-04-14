import { Request, Response } from 'express';
import User from '../db/models/user';
import sendVerificationEmail from '../utils/sendVerificationEmail';
const bcrypt = require('bcrypt');




const registerController = async (req: Request, res: Response) => {
  const { names, email, username, password } = req.body;
  try {
    // Check if the email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

              // Generate a verification token
    const verificationToken = Math.random().toString(36).substring(7);    
          
       
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password & email token
    const newUser = new User({ names, email, username, password: hashedPassword ,emailVerificationToken: verificationToken });

    // saving user
    await newUser.save();

     // Send the verification email
        await sendVerificationEmail(email, verificationToken,names);
    
        res.status(201).json({ message: 'User registered successfully. Please check your email for verification.' });
    console.log('User created successfully');
   
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export default registerController;
