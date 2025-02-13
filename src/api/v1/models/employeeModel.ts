import { CreateReadStreamOptions } from "fs/promises";

export interface Employee {
    employeeId: string;
    employeeName: string; 
    employeePosition: string;
    employeeDepartment: string;
    employeeEmail:string;
    employeePhone: string;
    employeeBranchId: string;
}
