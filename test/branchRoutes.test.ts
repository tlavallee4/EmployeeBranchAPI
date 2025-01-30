import request from "supertest";
import app from "../src/app";
import * as branchController from "../src/api/v1/controllers/branchController";

// Mocks for the branch controller methods
jest.mock("../src/api/v1/controllers/branchController", () => ({
    getBranches: jest.fn((req, res) => res.status(200).send()),
    createBranch: jest.fn((req, res) => res.status(201).send()),
    getBranchById: jest.fn((req, res) => res.status(200).send()),
    updateBranch: jest.fn((req, res) => res.status(200).send()),
    deleteBranch: jest.fn((req, res) => res.status(200).send()),
}));


describe("Branch Routes", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("GET /api/v1/branches", () => {
		it("should call getBranches controller", async () => {
			await request(app).get("/api/v1/branches");
			expect(branchController.getBranches).toHaveBeenCalled();
		});
	});

	describe("POST /api/v1/branches", () => {
		it("should call createBranch controller", async () => {
			const mockBranch = {
				branchName: "Test Branch",
				branchAddress: "123 Test St, Test City, TC, 12345",
				branchPhone: "555-555-5555",
			};
			await request(app).post("/api/v1/branches").send(mockBranch);
			expect(branchController.createBranch).toHaveBeenCalled();
		});
	});

	describe("GET /api/v1/branches/:id", () => {
		it("should call getBranchById controller", async () => {
			await request(app).get("/api/v1/branches/1");
			expect(branchController.getBranchById).toHaveBeenCalled();
		});
	});

	describe("PUT /api/v1/branches/:id", () => {
		it("should call updateBranch controller", async () => {
			const mockBranchUpdate = {
				branchName: "Updated Branch Name",
				branchAddress: "Updated Address",
			};
			await request(app).put("/api/v1/branches/1").send(mockBranchUpdate);
			expect(branchController.updateBranch).toHaveBeenCalled();
		});
	});

	describe("DELETE /api/v1/branches/:id", () => {
		it("should call deleteBranch controller", async () => {
			await request(app).delete("/api/v1/branches/1");
			expect(branchController.deleteBranch).toHaveBeenCalled();
		});
	});
});
