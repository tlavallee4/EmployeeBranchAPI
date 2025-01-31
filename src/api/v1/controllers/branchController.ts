import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchService";
import type { Branch } from "../services/branchService";


// Get all branches
export const getBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Fetch all branches from the service and store in branches
        const branches: Branch[] = await branchService.getBranches();
        res.status(200).json({ message: "Branches received", data: branches });
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
        res.status(201).json({ message: "Branch created", data: newBranch });
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
        res.status(200).json({ message: "Branch found", data: branch });
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
        res.status(200).json({ message: "Branch updated", data: updatedBranch });
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
        res.status(200).json({ message: "Branch deleted" });
    } catch (error) {
        next(error);
    }
};
