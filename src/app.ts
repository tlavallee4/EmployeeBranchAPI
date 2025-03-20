import express from "express";
import morgan from "morgan";

// import employeeRoutes
import employeeRoutes from "./api/v1/routes/employeeRoutes";

// import branchRoutes
import branchRoutes from "./api/v1/routes/branchRoutes";

// import setupSwagger endpoint
import setupSwagger from "../config/swaggerOptions"; 
import { error, timeStamp } from "console";
import errorHandler from "./api/v1/middleware/errorHandler";

const app = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

app.use(express.json());

app.use(errorHandler);

// setup swagger for api documentation
setupSwagger(app);

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