import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";

const router: Router = express.Router();

// Get all employees (read)
/**
 * @openapi
 * /api/v1/employees:
 *   get:
 *     summary: Get an array of all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: List of all employees - id, name, position, department, email, phone, branch id
 */
router.get("/", employeeController.getEmployees);

// Create a new employee (create)
/**
 * @openapi
 * /api/v1/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     responses:
 *       201:
 *         description: Successfully created a new employee.
 */
router.post("/", employeeController.createEmployee);

// Get an employee by ID (read)
/**
 * @openapi
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *     responses:
 *       200:
 *         description: Employee details
 *       404:
 *         description: Employee not found
 */
router.get("/:id", employeeController.getEmployeeById);

// Update an employee by ID (update)
/**
 * @openapi
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *     responses:
 *       200:
 *         description: Successfully updated the employee.
 *       404:
 *         description: Employee not found
 */
router.put("/:id", employeeController.updateEmployee);

// Delete an employee by ID (delete)
/**
 * @openapi
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *     responses:
 *       200:
 *         description: Successfully deleted the employee.
 *       404:
 *         description: Employee not found
 */
router.delete("/:id", employeeController.deleteEmployee);

export default router;
