import { Employee } from "../models/employeeModel";
import {
    createDocument,
    getDocuments,
    updateDocument,
    deleteDocument
} from "../repositories/firestoreRepositoriy";

const COLLECTION = "employees";

// Get all Employees from Firestore
export const getAllEmployees = async (): Promise<Employee[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return { employeeId: doc.id, ...data } as Employee;
    });
};

// Create a new Employee
export const createEmployee = async (Employee: Partial<Employee>): Promise<Employee> => {
    const id = await createDocument(COLLECTION, Employee);
    return { EmployeeId: id, ...Employee } as Employee;
};

// Update a Employee by ID
export const updateEmployee = async (
    EmployeeId: string,
    updates: Partial<Employee>
): Promise<Employee> => {
    await updateDocument(COLLECTION, EmployeeId, updates);
    return { EmployeeId, ...updates } as Employee;
};

// Delete a Employee by ID
export const deleteEmployee = async (EmployeeId: string): Promise<void> => {
    await deleteDocument(COLLECTION, EmployeeId);
};


// Get Employee by ID
export const getEmployeeById = async (employeeId: string): Promise<Employee | null> => {
    const snapshot = await getDocuments(COLLECTION);
    const employee = snapshot.docs.map((doc) => (
        { employeeId: doc.id, ...doc.data() } as Employee)).find((emp) => 
            emp.employeeId === employeeId);
    return employee || null;
};

// Get Employees by Branch ID
export const getEmployeesByBranch = async (branchId: string): Promise<Employee[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs.map((doc) => (
        { employeeId: doc.id, ...doc.data() } as Employee))
};

// Get Employees by Department
export const getEmployeesByDepartment = async (department: string): Promise<Employee[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs.map((doc) => (
        { employeeId: doc.id, ...doc.data() } as Employee)).filter((employee) => 
            employee.employeeDepartment === department);
};