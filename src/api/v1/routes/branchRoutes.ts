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
 *         description: Newly created branch object, including a unique ID
 */
router.post("/", branchController.createBranch);

// Get branch by id
/**
 * @openapi
 * /api/v1/branches/{id}:
 *   get:
 *     summary: Get a branch by ID
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: return the branch object for the specified ID
 */
router.get("/:id", branchController.getBranchById);

// Update a branch by ID (update)
/**
 * @openapi
 * /api/v1/branches/{id}:
 *   put:
 *     summary: Update a branch by ID
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: updated branch object, reflecting the changes
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
