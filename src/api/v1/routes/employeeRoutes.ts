import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { employeeSchema } from "../schemas/employeeSchema";
import {
	getEmployees,
	createEmployee,
	getEmployeeById,
	updateEmployee,
	deleteEmployee,
	getEmployeesByBranch,
	getEmployeesByDepartment,
} from "../controllers/employeeController";

const router: Router = express.Router();

/**
 * @openapi
 * /api/v1/employees:
 *   get:
 *     summary: Retrieve a list of all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Employee"
 */
router.get("/", getEmployees);

/**
 * @openapi
 * /api/v1/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Employee"
 *     responses:
 *       201:
 *         description: Successfully created a new employee.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: "Employee created successfully."
 *                 data:
 *                   $ref: "#/components/schemas/Employee"
 */
router.post("/", validateRequest(employeeSchema), createEmployee);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Retrieve an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "12345"
 *         description: The unique identifier of the employee.
 *     responses:
 *       200:
 *         description: Employee details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Employee"
 *       404:
 *         description: Employee not found
 */
router.get("/:id", getEmployeeById);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Update an employee's details by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "12345"
 *         description: The unique identifier of the employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Employee"
 *     responses:
 *       200:
 *         description: Successfully updated employee details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Employee"
 */
router.put("/:id", validateRequest(employeeSchema), updateEmployee);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "12345"
 *         description: The unique identifier of the employee.
 *     responses:
 *       200:
 *         description: Successfully deleted the employee.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: "Employee deleted successfully."
 *       404:
 *         description: Employee not found
 */
router.delete("/:id", deleteEmployee);

/**
 * @openapi
 * /api/v1/employees/branch/{branchId}:
 *   get:
 *     summary: Retrieve all employees for a specific branch
 *     tags: [Employees]
 *     parameters:
 *       - name: branchId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "1"
 *         description: The ID of the branch.
 *     responses:
 *       200:
 *         description: A list of employees for the branch.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Employee"
 *       404:
 *         description: No employees found for the branch.
 */
router.get("/branch/:branchId", getEmployeesByBranch);

/**
 * @openapi
 * /api/v1/employees/department/{department}:
 *   get:
 *     summary: Retrieve all employees for a specific department
 *     tags: [Employees]
 *     parameters:
 *       - name: department
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "Management"
 *         description: The name of the department.
 *     responses:
 *       200:
 *         description: A list of employees for the department.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Employee"
 *       404:
 *         description: No employees found for the department.
 */
router.get("/department/:department", getEmployeesByDepartment);

export default router;
