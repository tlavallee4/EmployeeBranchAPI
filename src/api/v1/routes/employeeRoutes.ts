import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";

const router: Router = express.Router();

// Get all employees (read)
router.get("/", employeeController.getEmployees);

// Create a new employee (create)
router.post("/", employeeController.createEmployee);

// Update an employee by ID (update)
router.put("/:id", employeeController.updateEmployee);

// Delete an employee by ID (delete)
router.delete("/:id", employeeController.deleteEmployee);

export default router;
