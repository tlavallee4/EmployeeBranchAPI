import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";
import type { Employee } from "../models/employeeModel";
import { successResponse } from "../models/responseModel";

// Get employees
export const getEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Fetch all employees from the service and storing it in employees
        const employees: Employee[] = await employeeService.getAllEmployees();
        res.status(200).json(
            successResponse(employees, "Employees received")
        );
    } catch (error) {
        // pass to next function if error
        next(error);
    }
};

// Create new employee
export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Create a new employee using the service and storing in employee
        const newEmployee: Employee = await employeeService.createEmployee(req.body);
        // 201 means successful creation
        res.status(201).json(
            successResponse(newEmployee, "Employee created")
        );
    } catch (error) {
        next(error);
    }
};

// Get employee by ID 
export const getEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employee = await employeeService.getEmployeeById(req.params.id);
        if (!employee) {
            res.status(404).json({ message: `Employee with ID ${req.params.id} not found` });
            return;
        }
        res.status(200).json(
            successResponse(employee, "Employee found")
        );
    } catch (error) {
        next(error);
    }
};
// Update an employee
export const updateEmployee = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const updatedEmployee = await employeeService.updateEmployee(
            req.params.id,
            req.body
        );
        res.status(200).json(
            successResponse(updatedEmployee, "Employee updated")
        );
    }catch(error){
        next(error);
    }
};

// Delete an employee
export const deleteEmployee = async(
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        await employeeService.deleteEmployee(req.params.id);
        res.status(200).json(
            successResponse(null, "Employee deleted")
        );    
    }catch(error){
        next(error);
    }
};

// New Endpoints 

// Get employee by branch 
export const getEmployeesByBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branchId = req.params.branchId;
        const employees = await employeeService.getEmployeesByBranch(branchId);

        if (employees.length === 0) {
            res.status(404).json({ message: `No employees found for branch ID ${branchId}` });
            return;
        }
        res.status(200).json(
            successResponse(employees,  "Employees found")
        );
    } catch (error) {
        next(error);
    }
};

// Get employee by department 
export const getEmployeesByDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const department = req.params.department;
        const employees = await employeeService.getEmployeesByDepartment(department);

        if (employees.length === 0) {
            res.status(404).json({ message: `No employees found for department ${department}` });
            return;
        }
        res.status(200).json(
            successResponse(employees, "Employees found")
        );
    } catch (error) {
        next(error);
    }
};