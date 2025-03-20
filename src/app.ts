// import helmet
import helmet from "helmet";

import dotenv from "dotenv";
dotenv.config();

import morgan from "morgan";

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

// helmet 
app.use(
	helmet({
	  contentSecurityPolicy: {
		directives: {
		  "default-src": ["'self'"],
		  "script-src": ["'self'"],  // XSS Protection
		  "style-src": ["'self'"],
		},
	  },
	  frameguard: { action: "deny" }, // Clickjacking
	  hidePoweredBy: true,
	})
  );

// setup swagger for api documentation
setupSwagger(app);

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

app.use(express.json());

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

app.use(errorHandler);

// test to make sure its running proper
// console.log("Loaded Environment Variables:", process.env);

export default app;

