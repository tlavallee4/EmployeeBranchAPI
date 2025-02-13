import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { employeeSchema } from "../schemas/employeeSchema";
import { getEmployees, 
        createEmployee, 
        getEmployeeById, 
        updateEmployee, 
        deleteEmployee, 
        getEmployeesByBranch, 
        getEmployeesByDepartment 
    } from "../controllers/employeeController";

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
router.get("/", getEmployees);

// Create a new employee (create)
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
 *             type: object
 *             properties:
 *               employeeName:
 *                 example: Alice Johnson
 *               employeePosition:
 *                 example: Branch Manager
 *               employeeDepartment:
 *                 example: Management
 *               employeeEmail:
 *                 example: alice.johnson@pixell-river.com
 *               employeePhone:
 *                 example: 604-555-0148
 *               employeeBranchId:
 *                  example: "1"
 *     responses:
 *       201:
 *         description: Successfully created a new employee.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: Employee created successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     employeeId:
 *                       example: "12345"
 *                     employeeName:
 *                       example: Alice Johnson
 *                     employeePosition:
 *                       example: Branch Manager
 *                     employeeDepartment:
 *                       example: Management
 *                     employeeEmail:
 *                       example: alice.johnson@pixell-river.com
 *                     employeePhone:
 *                       example: 604-555-0148
 *                     employeeBranchId:
 *                       example: "1"
 */
router.post("/", validateRequest(employeeSchema), createEmployee);

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
router.get("/:id", getEmployeeById);

// Update an employee by ID (update)
/**
 * @openapi
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Update an employee's details by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the employee to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeePosition:
 *                 type: string
 *               employeePhone:
 *                 type: string
 *             example:
 *               employeePosition: "Senior Manager"
 *               employeePhone: "123-456-7890"
 *     responses:
 *       200:
 *         description: Successfully updated employee details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employeeId:
 *                   type: string
 *                 employeeName:
 *                   type: string
 *                 employeePosition:
 *                   type: string
 *                 employeePhone:
 *                   type: string
 */
router.put("/:id", validateRequest(employeeSchema), updateEmployee);

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
router.delete("/:id", validateRequest(employeeSchema), deleteEmployee);

// New Endpoints

// Get all employees for a branch
/**
 * @openapi
 * /api/v1/employees/branch/{branchId}:
 *   get:
 *     summary: Get all employees for a specific branch
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the branch
 *     responses:
 *       200:
 *         description: A list of employees for the branch
 *       404:
 *         description: No employees found for the branch
 */
router.get("/branch/:branchId", getEmployeesByBranch);


// Get employees by department 
/**
 * @openapi
 * /api/v1/employees/department/{department}:
 *   get:
 *     summary: Get all employees for a specific department
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: department
 *         required: true
 *         schema:
 *           type: string
 *         description: The department name
 *     responses:
 *       200:
 *         description: A list of employees for the department
 *       404:
 *         description: No employees found for the department
 */
router.get("/department/:department", getEmployeesByDepartment);


export default router;
