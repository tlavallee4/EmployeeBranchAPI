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

describe("updateEmployee", () => {
    const mockEmployeeUpdate = {
        employeeName: "Updated Name",
        employeePosition: "Senior Developer",
        employeeEmail: "updated@example.com",
        employeeBranchId: "4",
    };

    it("should return 200 when an employee is updated", async () => {
        (employeeService.updateEmployee as jest.Mock).mockResolvedValue(mockEmployeeUpdate);

        mockReq.params = { id: "1" };
        mockReq.body = mockEmployeeUpdate;
        await employeeController.updateEmployee(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employee updated",
            status: "success",
            data: mockEmployeeUpdate,
        });
    });
});

describe("deleteEmployee", () => {
    it("should return 200 when an employee is deleted", async () => {
        (employeeService.deleteEmployee as jest.Mock).mockResolvedValue(undefined);

        mockReq.params = { id: "1" };
        await employeeController.deleteEmployee(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employee deleted",
            status: "success",
            data: null,
        });
    });
});