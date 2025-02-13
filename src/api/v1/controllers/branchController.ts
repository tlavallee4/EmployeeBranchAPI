import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchService";
import type { Branch } from "../models/branchModel";
import { successResponse } from "../models/responseModel";

// Get all branches
export const getBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Fetch all branches from the service and store in branches
        const branches: Branch[] = await branchService.getAllBranches();
        res.status(200).json(
            successResponse(branches, "Branches received")
        );
    } catch (error) {
        // Pass to the next function if error
        next(error);
    }
};

// Create a new branch
export const createBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Create a new branch using the service and store in branch
        const newBranch: Branch = await branchService.createBranch(req.body);
        // 201 means successful creation
        res.status(201).json(
            successResponse(newBranch, "Item created successfully")
    );
    } catch (error) {
        next(error);
    }
};

// Get a branch by ID
export const getBranchById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branch = await branchService.getBranchById(req.params.id);
        if (!branch) {
            res.status(404).json({ message: `Branch with ID ${req.params.id} not found` });
            return;
        }
        res.status(200).json(
            successResponse(branch, "Branch found")
        );
    } catch (error) {
        next(error);
    }
};

// Update a branch
export const updateBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const updatedBranch = await branchService.updateBranch(
            req.params.id,
            req.body
        );
        res.status(200).json( 
            successResponse(updateBranch, "Item updated successfully")
    );
    } catch (error) {
        next(error);
    }
};

// Delete a branch
export const deleteBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await branchService.deleteBranch(req.params.id);
        res.status(200).json(
            successResponse(null, "Item deleted successfully")
        );
    } catch (error) {
        next(error);
    }
};
