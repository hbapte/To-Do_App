import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateForgot = [ 
    check('email')
        .exists().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
    ];

