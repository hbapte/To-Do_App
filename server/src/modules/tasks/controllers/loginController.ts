import { Request, Response } from 'express';
import User from '../../../database/models/user';
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken') ;



const loginController = async (req: Request, res: Response) => {
  const { emailUsername, password, rememberMe} = req.body;
  // console.log('Login request:', req.body);
  try {
    // Find the user by email or username
    const user = await User.findOne({ $or: [{ email: emailUsername }, { username: emailUsername }] });

    if (!user) {
      // User not found
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Wrong password
      return res.status(401).json({ error: 'Wrong password' });
    }

     // JWT token with JWT_SECRET
     const expiresIn = rememberMe ? '7d' : '1h'; 
     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn });
 
     console.log('Login successful');
     res.cookie('token', token, { httpOnly: true }); 

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default loginController;
