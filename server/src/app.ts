import express, { Express, Request, Response } from "express";
import path from "path";
import loginController from "./modules/tasks/controllers/loginController";
import registerController  from "./modules/tasks/controllers/registerController";
import forgotPasswordController from "./modules/tasks/controllers/forgotPasswordController";
import { passwordResetController } from "./modules/tasks/controllers/resetPasswordController";
import { validateRegistration } from "./middlewares/registerValidation";
import authMiddleware from './middlewares/authMiddleware';
const cookieParser = require('cookie-parser');
import taskRoutes from "./routes/taskRoutes";
import "./database/config/db";  




const app: Express = express();
const port = process.env.PORT;

// Set up middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, '../../', 'client')));

// Set up your routes
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../', 'client', 'login.html'));
});

app.get("/forgot-password", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../', 'client', 'forgot-password.html'));
});

app.get("/register", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../', 'client', 'register.html'));
});

app.get("/login", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../', 'client', 'login.html'));
});

app.get("/reset-password", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'reset-pswd.html'));
});

app.get("/forgot-password", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../', 'client', 'forgot-pswd.html'));
});


//Routes
app.use("/login", loginController);
app.use("/register", registerController);
app.use("/forgot-password", forgotPasswordController);
app.use("/reset-password", passwordResetController);


app.use("/tasks", taskRoutes); 



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
