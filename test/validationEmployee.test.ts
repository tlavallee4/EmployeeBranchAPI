import { invalid } from "node_modules/joi/lib";
import { employeeSchema } from "../src/api/v1/schemas/employeeSchema";

describe("Employee Schema Validation", () => {
    it("should validate correct employee data", () => {
        const validEmployee = {
            employeeName: "Tanelle Lavallee",
            employeePosition: "Software Developer",
            employeeEmail: "tlavallee@email.com",
            employeeBranchId: "7",
        };

        const { error } = employeeSchema.validate(validEmployee);
        expect(error).toBeUndefined();
    });

    it("should return an error for empty employee name", () => {
        const invalidEmployeeName = {
          employeeName: "",
          employeePosition: "Software Developer",
          employeeEmail: "tlavallee@email.com",
          employeeBranchId: "7",
        };

        const { error } = employeeSchema.validate(invalidEmployeeName);
        expect(error).toBeDefined();
        expect(error?.details[0].message).toMatch("Employee name cannot be empty");
    });

    it("should return an error for empty employee position", () => {
        const invalidEmployeePosition = {
          employeeName: "Tanelle Lavallee",
          employeePosition: "",
          employeeEmail: "tlavallee@email.com",
          employeeBranchId: "7",
        };

        const { error } = employeeSchema.validate(invalidEmployeePosition);
        expect(error).toBeDefined();
        expect(error?.details[0].message).toMatch("Employee position cannot be empty");
    });

    it("should return an error for empty employee email", () => {
        const invalidEmployeeEmail = {
          employeeName: "Tanelle Lavallee",
          employeePosition: "Software Developer",
          employeeEmail: "",
          employeeBranchId: "7",
        };

        const { error } = employeeSchema.validate(invalidEmployeeEmail);
        expect(error).toBeDefined();
        expect(error?.details[0].message).toMatch("Employee email cannot be empty");
    });

    it("should return an error for empty employeeBranchId", () => {
        const invalidEmployeeBranch = {
            employeeName: "John Doe",
            employeePosition: "Software Developer",
            employeeEmail: "john.doe@example.com",
            employeeBranchId: "",
        };

        const { error } = employeeSchema.validate(invalidEmployeeBranch);
        expect(error).toBeDefined();
        expect(error?.details[0].message).toMatch("Branch ID cannot be empty");
    });
});
