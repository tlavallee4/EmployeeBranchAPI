import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";
import type { Employee } from "../services/employeeService";

// Get employees
export const getEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Fetch all employees from the service and storing it in employees
        const employees: Employee[] = await employeeService.fetchAllEmployees();
        res.status(200).json({ message: "Employees received", data: employees });
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
        res.status(201).json({ message: "Employee created", data: newEmployee });
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
        res.status(200).json({message: "Employee updated", data:updatedEmployee});
    }catch(error){
        next(error);
    }
};

export const deleteEmployee = async(
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        await employeeService.deleteEmployee(req.params.id);
        res.status(200).json({message: "Employee deleted"});
    }catch(error){
        next(error);
    }
};