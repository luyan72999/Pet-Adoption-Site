import express from 'express';
import dotenv from 'dotenv';
import morgan from "morgan";
import cors from "cors";
import userRoutes from '../routes/userRoute.js';
import petRoutes from '../routes/petRoute.js';
import applicationRoutes from '../routes/applicationRoute.js';
import { globalErrorHandler, urlNotFoundHandler } from '../middlewares/globalErrorHandler.js';


dotenv.config(); // dotenv.config() enables access to .env file

// create an app
const app = express();

// ping endpoint: http://localhost:8000/api/v1/ping
app.get("/api/v1/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
});

// add express.json() to app as middleware
app.use(express.json());

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// add routes to app as middlewares (a middleware can access req and res, and do some operations on them)
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/pets", petRoutes);
app.use("/api/v1/applications", applicationRoutes);

// the error handler middlewares pipeline
app.use(urlNotFoundHandler);
app.use(globalErrorHandler);


// export app as a module for other files to use
export default app;
