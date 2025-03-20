// External library imports
import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

// Internal module imports
import { MiddlewareFunction, RequestData } from "../types/express";

export const validate = <T>(schema: ObjectSchema<T>, data: T): void => {
	const { error } = schema.validate(data, { abortEarly: false });
    // If validation fails (error exists):
    // Throws an error with a formatted message.
	if (error) {
		throw new Error(
			`Validation error: ${error.details
				.map((x) => x.message)
				.join(", ")}`
                // error.details.map((x) => x.message).join(", "):
                // Extracts all error messages from the details array.
                // Converts them into a readable string, separated by commas.                
		);
	}
};

export const validateRequest = (schema: ObjectSchema): MiddlewareFunction => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
            // Combines all request parts into a single object
			const data: RequestData = {
				...req.body,
				...req.params,
				...req.query,
			};
            // validate function to check data with Joi schema.
			validate(schema, data);
            // Calls next() to pass control to the next middleware
			next();
        // Catches the error
        // Responds with HTTP 400 Bad Request. Sends a JSON response with the error message.      
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	};
};