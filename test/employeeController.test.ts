import { Request, Response, NextFunction } from "express";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import * as employeeService from "../src/api/v1/services/employeeService";

jest.mock("../src/api/v1/services/employeeService");

let mockReq: Partial<Request>;
let mockRes: Partial<Response>;
let mockNext: NextFunction;

beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { params: {}, body: {} };
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    mockNext = jest.fn();
});

describe("getEmployees", () => {
    it("should handle successful operations", async () => {
        const mockEmployees = [
            { employeeName: "Tanelle Lavallee", employeePosition: "Soft Dev" },
        ];
        (employeeService.getAllEmployees as jest.Mock).mockResolvedValue(mockEmployees);

        await employeeController.getEmployees(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employees received",
            status: "success",
            data: mockEmployees,
        });
        
    });
});

describe("createEmployee", () => {
    const mockEmployee = {
        employeeName: "Tanelle Lavallee",
        employeePosition: "Branch Manager",
        employeeEmail: "tlavallee@example.com",
        employeeBranchId: "7",
    };

    it("should return 201 when a new employee is created", async () => {
        (employeeService.createEmployee as jest.Mock).mockResolvedValue(mockEmployee);

        mockReq.body = mockEmployee;
        await employeeController.createEmployee(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employee created",
            status: "success",
            data: mockEmployee,
        });
    });
});
