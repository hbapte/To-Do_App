import express, { Express, Request, Response } from "express";
import path from "path";
import { loginController } from "./controllers/loginController";
import registerController  from "./controllers/registerController";
import { forgotPasswordController } from "./controllers/forgotPasswordController";
import { passwordResetController } from "./controllers/resetPasswordController";
import { validateRegistration } from "./middlewares/registerValidation";
import authMiddleware from './middlewares/authMiddleware';
const cookieParser = require('cookie-parser');
import taskRoutes from "./routes/taskRoutes";
import "./config/db"; 



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
  res.sendFile(path.join(__dirname, '../../', 'client', 'index.html')); // Send the index.html file from the 'client' directory
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

app.get("/dashboard", authMiddleware, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../', 'client', 'dashboard.html'));
});

//Routes
app.use("/login", loginController);
app.use("/register", registerController);
app.use("/forgot-password", forgotPasswordController);
app.use("/reset-password", passwordResetController);


app.use("/tasks", taskRoutes); // Use taskRoutes for handling task-related routes



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
