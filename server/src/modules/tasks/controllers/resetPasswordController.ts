import {Router, Request, Response } from 'express';
const bcrypt = require('bcrypt');
import User from '../../../database/models/user';
import { validateReset } from '../../../middlewares/resetValidation';

const router = Router();

// Define the password reset route
router.post('/',validateReset, async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;

    try {
        // Find user by reset token and check expiration
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: new Date() } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired reset token' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password and clear reset token fields
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        // Send success response
        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Export the router
export { router as passwordResetController };
