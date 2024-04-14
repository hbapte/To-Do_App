import { Request, Response } from 'express';
import User from '../db/models/user';
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
     const expiresIn = rememberMe ? '7d' : '1m'; 
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

// import { Router, Request, Response } from 'express';
// import User from '../db/models/user';
// import { validateLogin } from '../middlewares/loginValidationMiddleware';
// const bcrypt = require('bcrypt'); 
// const jwt = require('jsonwebtoken');


// const router = Router();


// router.post('/', validateLogin, async (req: Request, res: Response) => {
//   const { 'email-username': emailOrUsername, 'password-': password, 'remember-me': rememberMe  } = req.body;

//   try {
//     // Check if the user exists by username or email
//     const user = await User.findOne({
//       $or: [{ username: emailOrUsername }, { email: emailOrUsername }]
//     });
//     if (!user) {
//       console.log('User not found');
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // console.log('Retrieved User:', user);

//     // Compare the passwords using bcrypt
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       console.log('Invalid password');
//       return res.status(401).json({ error: 'Wrong Password' });
//     }

//     // JWT token with JWT_SECRET
//     const expiresIn = rememberMe ? '7d' : '1h'; 
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn });

//     console.log('Login successful');
//     res.cookie('token', token, { httpOnly: true }); 
//     res.redirect('/dashboard');
//   } catch (error) {
//     console.error('Error logging in user:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// export { router as loginController };
