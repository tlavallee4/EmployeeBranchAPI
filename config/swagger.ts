// import swagger ui middles, jsdoc-library
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import dotenv from "dotenv";

import {Express} from "express";

// environment variables loaded 
dotenv.config();

// get server URL
const serverURL = process.env.SWAGGER_SERVER_URL || "http://localhost:3000/api/v1";

// define swagger options 
const swaggerOptions: swaggerJsDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "PiXELL-River Financial",
            version: "1.0.0",
            description: "Managing employees and branches"
        },
    },
    // path to annotated files
    apis: ["./src/api/v1/routes/*.ts"]
};

// Initialize Swagger JSDoc object
const swaggerDocs: any = swaggerJsDoc(swaggerOptions);

// serve swagger
const setSwagger = (app: Express): void => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

// export swagger endpoint for Express app
export default setSwagger;