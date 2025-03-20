// import swagger ui middles, jsdoc-library
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
//import dotenv from "dotenv";

import {Express} from "express";

// environment variables loaded 
//dotenv.config();

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
    servers: [
        {
            url: serverURL,
            description:
                process.env.NODE_ENV === "production"
                ? "Production Server" : "Local server"
        },
    ],
    components: {
        securitySchemas: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        }
    ],
    // path to annotated files
    apis: [
        "./src/api/v1/routes/*.ts",
        "./src/api/v1/controllers/*.ts",
        "./src/api/v1/models/*.ts"
    ] // PATH to the API docs and schemas
    // path to annotated files
};

// Generate the Swagger spec
export const generateSwaggerSpec = (): object => {
    return swaggerJsDoc(swaggerOptions);
}