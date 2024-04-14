import express from 'express';
// import { registerUser,loginUser } from '../controllers/loginController';
import { validateRegistration} from '../middlewares/registerValidation';
import{validateLogin } from '../middlewares/loginValidationMiddleware';

const router = express.Router();

router.post('/register', validateRegistration,);

router.post('/login', validateLogin, );

export default router;
