import express from "express";
import morgan from "morgan";

// import itemRoutes
import employeeRoutes from "./api/v1/routes/employeeRoutes";

// import setupSwagger endpoint
import setupSwagger from "../config/swagger"; 
import { timeStamp } from "console";

const app = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

app.use(express.json());

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

// register itemRoutes
app.use("/api/v1/employees", employeeRoutes)

export default app;