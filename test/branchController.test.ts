import { Request, Response, NextFunction } from "express";
import * as branchController from "../src/api/v1/controllers/branchController";
import * as branchService from "../src/api/v1/services/branchService";

jest.mock("../src/api/v1/services/branchService");

let mockReq: Partial<Request>;
let mockRes: Partial<Response>;
let mockNext: NextFunction;

beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { params: {}, body: {} };
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    mockNext = jest.fn();
});

describe("getAllBranches", () => {
    it("should handle successful operations", async () => {
        const mockBranches = [{ 
            branchName: "TD Branch",
            branchAddress: "444 Branch street" },
        ];
        (branchService.getAllBranches as jest.Mock).mockResolvedValue(mockBranches);

        await branchController.getBranches(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Branches received",
            status: "success",
            data: mockBranches,
        });
    });
});

describe("createBranch", () => {
    const mockBranch = {
        branchName: "Branch 5",
        branchAddress: "555 Branch street",
        branchPhone: "555-555-5555",
    };

    it("should return 201 when a new branch is created", async () => {
        (branchService.createBranch as jest.Mock).mockResolvedValue(mockBranch);

        mockReq.body = mockBranch;
        await branchController.createBranch(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Item created successfully",
            status: "success",
            data: mockBranch,
        });
    });
});

describe("updateBranch", () => {
    const mockBranchUpdate = {
        branchName: "Branch 12",
        branchAddress: "123 newbranch street",
        branchPhone: "204-555-9999",
    };

    it("should return 200 when a branch is updated", async () => {
        (branchService.updateBranch as jest.Mock).mockResolvedValue(mockBranchUpdate);

        mockReq.params = { id: "1" };
        mockReq.body = mockBranchUpdate;
        await branchController.updateBranch(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Item updated successfully",
            status: "success",
            data: mockBranchUpdate,
        });
    });
});

describe("deleteBranch", () => {
    it("should return 200 when a branch is deleted", async () => {
        (branchService.deleteBranch as jest.Mock).mockResolvedValue(undefined);

        mockReq.params = { id: "1" };
        await branchController.deleteBranch(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Item deleted successfully",
            status: "success",
            data: null,
        });
    });
});
