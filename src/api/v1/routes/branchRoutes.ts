import express, { Router } from "express";
import * as branchController from "../controllers/branchController";

const router: Router = express.Router();

// Get all branches (read)
/**
 * @openapi
 * /api/v1/branches:
 *   get:
 *     summary: Get an array of all branches
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: List of all branches - id, name, address, phone
 */
router.get("/", branchController.getBranches);

// Create a new branch (create)
/**
 * @openapi
 * /api/v1/branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     responses:
 *       201:
 *         description: New branch made
 */
router.post("/", branchController.createBranch);

// Update a branch by ID (update)
/**
 * @openapi
 * /api/v1/branches/{id}:
 *   put:
 *     summary: Update a branch by ID
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: Branch updated
 */
router.put("/:id", branchController.updateBranch);

// Delete a branch by ID (delete)
/**
 * @openapi
 * /api/v1/branches/{id}:
 *   delete:
 *     summary: Delete a branch by ID
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: Branch successfully deleted
 */
router.delete("/:id", branchController.deleteBranch);

export default router;
