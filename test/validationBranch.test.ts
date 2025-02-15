import { branchSchema } from "../src/api/v1/schemas/branchSchema";

describe("Branch Schema Validation", () => {
    it("should validate branch", () => {
        const mockBranchValid = {
            branchName: "Fake Branch",
            branchAddress: "123 Fake Street",
            branchPhone: "555-555-5555",
        };

        const { error } = branchSchema.validate(mockBranchValid);
        expect(error).toBeUndefined(); // Should pass
    });

    it("should return an error for empty branch name", () => {
        const mockBranchInvalidName = {
            branchName: "",
            branchAddress: "123 Fake Street",
            branchPhone: "555-555-5555",
        };

        const { error } = branchSchema.validate(mockBranchInvalidName);
        expect(error).toBeDefined();
        expect(error?.details[0].message).toMatch("Branch name cannot be empty");
    });

    it("should return an error for empty branch address", () => {
        const mockBranchInvalidAddress = {
            branchName: "Fake Branch",
            branchAddress: "",
            branchPhone: "555-555-5555",
        };

        const { error } = branchSchema.validate(mockBranchInvalidAddress);
        expect(error).toBeDefined();
        expect(error?.details[0].message).toMatch("Branch address cannot be empty");
    });

    it("should return an error for empty branch phone number", () => {
        const mockBranchInvalidPhone = {
            branchName: "Fake Branch",
            branchAddress: "123 Fake Street",
            branchPhone: "",
        };

        const { error } = branchSchema.validate(mockBranchInvalidPhone);
        expect(error).toBeDefined();
        expect(error?.details[0].message).toMatch("Branch phone number cannot be empty");
    });
});
