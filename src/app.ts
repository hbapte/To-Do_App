import express, { Express, Request, Response } from "express";
import path from "path";
import indexRouter from "./routes/index";
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


// Mount all API routes under '/api'
app.use('/api/tasks', taskRoutes);
app.use('/api', indexRouter);


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;