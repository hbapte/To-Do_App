const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  userId?: string; 
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token; 
  if (!token) {
    return res.redirect('/login?sessionExpired=true');
      }

  try {
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error('Error verifying JWT:', error);
    return res.redirect('/login?sessionExpired=true');
  }
};

export default authMiddleware;
