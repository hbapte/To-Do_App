import express from "express";
import loginController from "../modules/users/controller/loginController";
import registerController from "../modules/users/controller/registerController";



const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);

export default authRouter;

