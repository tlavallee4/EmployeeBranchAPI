import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { branchSchema } from "../schemas/branchSchema";
import { createBranch, 
        getBranches,
        getBranchById, 
        updateBranch,
        deleteBranch,
} from "../controllers/branchController";

const router: Router = express.Router();

// Create a new branch (create)
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
 *             type: object
 *             properties:
 *               branchName:
 *                 example: Vancouver Branch
 *               branchAddress:
 *                 example: 1300 Burrard St, Vancouver, BC, V6Z 2C7
 *               branchPhone:
 *                 example: 604-456-0022
 *     responses:
 *       201:
 *         description: Successfully created a new branch.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Branch created successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     branchId:
 *                       example: "1"
 *                     branchName:
 *                       example: Vancouver Branch
 *                     branchAddress:
 *                       example: 1300 Burrard St, Vancouver, BC, V6Z 2C7
 *                     branchPhone:
 *                       example: 604-456-0022
 */
router.post("/", validateRequest(branchSchema), createBranch);

// Get all branches (read)
/**
 * @openapi
 * /api/v1/branches:
 *   get:
 *     summary: Get an array of all branches
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: List of all branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   branchId:
 *                     example: "1"
 *                   branchName:
 *                     example: Vancouver Branch
 *                   branchAddress:
 *                     example: 1300 Burrard St, Vancouver, BC, V6Z 2C7
 *                   branchPhone:
 *                     example: 604-456-0022
 */
router.get("/", getBranches);

// Get branch by ID
/**
 * @openapi
 * /api/v1/branches/{id}:
 *   get:
 *     summary: Get a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       200:
 *         description: Branch details
 *       404:
 *         description: Branch not found
 */
router.get("/:id", getBranchById);

// Update a branch by ID (update)
/**
 * @openapi
 * /api/v1/branches/{id}:
 *   put:
 *     summary: Update a branch by ID
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               branchName:
 *                 example: Updated Vancouver Branch
 *               branchAddress:
 *                 example: 1234 New Address St, Vancouver, BC, V6Z 2C7
 *               branchPhone:
 *                 example: 604-999-1234
 *     responses:
 *       200:
 *         description: Successfully updated branch details.
 */
router.put("/:id", validateRequest(branchSchema), updateBranch);

// Delete a branch by ID (delete)
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
 *           example: "1"
 *     responses:
 *       200:
 *         description: Branch successfully deleted
 *       404:
 *         description: Branch not found
 */
router.delete("/:id", deleteBranch);

export default router;
