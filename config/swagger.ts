// import swagger ui middles, jsdoc-library
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import {Express} from "express";

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