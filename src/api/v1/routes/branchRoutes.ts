import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { branchSchema } from "../schemas/branchSchema";
import {
	createBranch,
	getBranches,
	getBranchById,
	updateBranch,
	deleteBranch,
} from "../controllers/branchController";

const router: Router = express.Router();

/**
 * @openapi
 * /api/v1/branches:
 *   get:
 *     summary: Retrieve a list of all branches
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: A list of branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Branch"
 */
router.get("/", getBranches);

/**
 * @openapi
 * /api/v1/branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Branch"
 *     responses:
 *       201:
 *         description: Successfully created a new branch.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: "Branch created successfully."
 *                 data:
 *                   $ref: "#/components/schemas/Branch"
 */
router.post("/", validateRequest(branchSchema), createBranch);

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   get:
 *     summary: Retrieve a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "1"
 *         description: The unique identifier of the branch.
 *     responses:
 *       200:
 *         description: Branch details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Branch"
 *       404:
 *         description: Branch not found
 */
router.get("/:id", getBranchById);

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   put:
 *     summary: Update a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "1"
 *         description: The unique identifier of the branch.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Branch"
 *     responses:
 *       200:
 *         description: Successfully updated branch details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Branch"
 */
router.put("/:id", validateRequest(branchSchema), updateBranch);

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   delete:
 *     summary: Delete a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "1"
 *         description: The unique identifier of the branch.
 *     responses:
 *       200:
 *         description: Successfully deleted the branch.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: "Branch deleted successfully."
 *       404:
 *         description: Branch not found
 */
router.delete("/:id", deleteBranch);

export default router;
