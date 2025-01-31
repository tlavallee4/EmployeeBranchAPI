import request from "supertest";
import app from "../src/app";
import * as employeeController from "../src/api/v1/controllers/employeeController";

// Mock the employee controller methods
jest.mock("../src/api/v1/controllers/employeeController", () => ({
    getEmployees: jest.fn((req, res) => res.status(200).send()),
    createEmployee: jest.fn((req, res) => res.status(201).send()),
    getEmployeeById: jest.fn((req, res) => res.status(200).send()),
    updateEmployee: jest.fn((req, res) => res.status(200).send()),
    deleteEmployee: jest.fn((req, res) => res.status(200).send()),
}));

describe("Employee Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/employees", () => {
        it("should call getEmployees controller", async () => {
            await request(app).get("/api/v1/employees");
            expect(employeeController.getEmployees).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/employees", () => {
        it("should call createEmployee controller", async () => {
            const mockEmployee = {
                employeeName: "Lila Spence",
                employeePosition: "Loan Coordinator",
                employeeDepartment: "Loans",
                employeeEmail: "lila.spence@pixell-river.com",
                employeePhone: "204-555-0480",
                employeeBranchId: "4",
            };
            await request(app).post("/api/v1/employees").send(mockEmployee);
            expect(employeeController.createEmployee).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/employees/:id", () => {
        it("should call getEmployeeById controller", async () => {
            await request(app).get("/api/v1/employees/1");
            expect(employeeController.getEmployeeById).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/employees/:id", () => {
        it("should call updateEmployee controller", async () => {
            const mockEmployeeUpdate = {
                employeePosition: "Branch General Manager",
            };
            await request(app).put("/api/v1/employees/1").send(mockEmployeeUpdate);
            expect(employeeController.updateEmployee).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/employees/:id", () => {
        it("should call deleteEmployee controller", async () => {
            await request(app).delete("/api/v1/employees/1");
            expect(employeeController.deleteEmployee).toHaveBeenCalled();
        });
    });
});
