import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateRegistration = [
  
  check('names')
    .exists().withMessage('Names are required')
    .isLength({ min: 3 }).withMessage('Names must be at least 3 characters long')
    .matches(/^[a-zA-Z ]+$/).withMessage('Names must contain only alphabets and spaces'),

  check('email')
    .exists().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),

  check('username')
    .exists().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
    .matches(/^[a-zA-Z_]/).withMessage('Username must start with a letter or underscore')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username must contain only alphabets, numbers, and underscores'),

  check('password')
    .exists().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .custom((value, { req }) => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);

      if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
        throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      }
      return true;
    }),

  check('confirm-password')
    .exists().withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];