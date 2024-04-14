import { Request, Response } from 'express';
import User from '../db/models/user';


const verifyEmailController = async (req: Request, res: Response) => {
  const token: string | undefined = req.query.token as string;

  try {
      // Find the user by verification token
      const user = await User.findOne({ emailVerificationToken: token });
      if (!user) {
          return res.status(404).json({ error: 'Invalid verification token' });
      }

      // Check if the token has expired
      const expirationTime = parseInt(req.query.expires as string);
      if (isNaN(expirationTime) || expirationTime < Date.now()) {
          return res.status(400).json({ error: 'Verification link has expired' });
      }

      // Mark the user's email as verified and remove the verification token
      user.emailVerified = true;
      user.emailVerificationToken = ''; // Assign an empty string instead of undefined
      await user.save();

      res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
      console.error('Error verifying email:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};




export default verifyEmailController;