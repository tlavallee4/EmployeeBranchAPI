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
router.post("/", employeeController.createEmployee);

// Get an employee by ID (read)
/**
 * @openapi
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: Employee details
 *       404:
 *         description: Employee not found
 */
router.get("/:id", employeeController.getEmployeeById);

// Update an employee by ID (update)
router.put("/:id", employeeController.updateEmployee);

// Delete an employee by ID (delete)
router.delete("/:id", employeeController.deleteEmployee);

export default router;
