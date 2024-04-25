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


// Mount all API routes under '/api'
app.use('/api/tasks', taskRoutes);
app.use('/api', indexRouter);


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;