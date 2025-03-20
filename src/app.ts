import dotenv from "dotenv";

import morgan from "morgan";

dotenv.config();

// import employeeRoutes
import employeeRoutes from "./api/v1/routes/employeeRoutes";

import express, { Express } from "express";

// import setupSwagger endpoint
import setupSwagger from "../config/swagger"; 
import { error, timeStamp } from "console";
import errorHandler from "./api/v1/middleware/errorHandler";
// import branchRoutes
import branchRoutes from "./api/v1/routes/branchRoutes";

const app: Express = express();

// setup swagger for api documentation
setupSwagger(app);

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

app.use(express.json());
app.use(errorHandler);

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check for the server
 *     description: Returns the server health status.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is healthy
 */
app.get("/health", (req, res) => {
	res.send("Server is healthy");
});

// register employeeRoutes and branchRoutes
app.use("/api/v1/employees", employeeRoutes)
app.use("/api/v1/branches", branchRoutes);

export default app;