// forgotPasswordController.ts
import { Request, Response } from 'express';
import User from '../db/models/user';
import { validateForgot } from '../middlewares/forgotValidation';
const bcrypt = require('bcrypt');
const crypto = require('crypto');
import sendPasswordResetEmail from '../utils/sendPasswordReset';

const forgotPasswordController = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = new Date(Date.now() + 3600000); // Token expires in 1 hour
        await user.save();

        // Send reset email
        await sendPasswordResetEmail(email, resetToken);

        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error('Error requesting password reset:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default forgotPasswordController;
