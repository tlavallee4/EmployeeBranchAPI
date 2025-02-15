import { Request, Response, NextFunction } from "express";
import errorHandler from "../src/api/v1/middleware/errorHandler";

interface ExtendedError extends Error {
    code?: string;
    statusCode?: number;
}

describe("Error Handling Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            setHeader: jest.fn(),
        };
        mockNext = jest.fn();
    });

    it("should handle 500 Server Error", () => {
        const serverError: ExtendedError = new Error("Unexpected error");

        errorHandler(serverError, mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "error",
            message: "An unexpected error occurred. Please try again.",
            code: "UNKNOWN_ERROR",
        });
    });

    it("should handle 404 Not Found error", () => {
        const notFoundError: ExtendedError = new Error("Not found error");
        notFoundError.statusCode = 404;

        errorHandler(notFoundError, mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "error",
            message: "An unexpected error occurred. Please try again.",
            code: "UNKNOWN_ERROR",
        });
    });

    it("should handle a validation error with 400 Bad Request", () => {
        const validationError: ExtendedError = new Error("Invalid input");
        validationError.statusCode = 400;

        errorHandler(validationError, mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "error",
            message: "An unexpected error occurred. Please try again.",
            code: "UNKNOWN_ERROR",
        });
    });
});
