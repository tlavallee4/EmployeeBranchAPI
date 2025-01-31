// Create interface for Employees
export type Employee = {
    employeeId: string;
    employeeName: string;
    employeePosition: string;
    employeeDepartment: string;
    employeeEmail: string;
    employeePhone: string;
    employeeBranchId: string;
}

// employee stored
const employees: Employee[] = [
    {
        employeeId: "1",
        employeeName: "Alice Johnson",
        employeePosition: "Branch Manager",
        employeeDepartment: "Management",
        employeeEmail: "alice.johnson@pixell-river.com",
        employeePhone: "604-555-0148",
        employeeBranchId: "1",
    },
    {
        employeeId: "2",
        employeeName: "Bob Smith",
        employeePosition: "Software Engineer",
        employeeDepartment: "IT",
        employeeEmail: "bob.smith@pixell-river.com",
        employeePhone: "204-555-0193",
        employeeBranchId: "3",
    },
    {
        employeeId: "3",
        employeeName: "Maria Garcia",
        employeePosition: "Loan Officer",
        employeeDepartment: "Loans",
        employeeEmail: "maria.garcia@pixell-river.com",
        employeePhone: "204-555-0193",
        employeeBranchId: "3",
    },
    {
        employeeId: "4",
        employeeName: "James Wilson",
        employeePosition: "IT Support Specialist",
        employeeDepartment: "IT",
        employeeEmail: "james.wilson@pixell-river.com",
        employeePhone: "604-555-0134",
        employeeBranchId: "1",
    },
];

// get all employees
export const getEmployees = async() : Promise<Employee[]> => {
    return employees;
}

// create a new employee
export const createEmployee = async( employee: {
    employeeName: string;
    employeePosition: string;
    employeeDepartment: string;
    employeeEmail: string;
    employeePhone: string;
    employeeBranchId: string;
}): Promise<Employee> => { 
    // ...item is a spread. spreads out the value to an array
    // get an id
    const newEmployee: Employee = {employeeId: Date.now().toString(), ...employee};
    // add the employee to Employee storage    
    employees.push(newEmployee);
        // return created employee
        return newEmployee;
};

// Get employee by ID
export const getEmployeeById = async (id: string): Promise<Employee | null> => {
    return employees.find((employee) => employee.employeeId === id) || null;
};

// Update employee
// Iterate through employees by id
export const updateEmployee = async(
    employeeId:string, 
    employee: {employeeName: string, employeePosition: string, employeeDepartment: string,
        employeeEmail: string, employeePhone: string, employeeBranchId: string}
): Promise<Employee> => {
    const index: number = employees.findIndex((i) => i.employeeId === employeeId);
    // if match not found
    if(index === -1){
        throw new Error(`Item with ID ${employeeId} not found`);
    }
    // Updating the employee
    employees[index] = {employeeId, ...employee}
    // Return the updated employee
    return employees[index]
};

// Delete employee
export const deleteEmployee = async (employeeId: string): Promise<void> => {
    const index: number = employees.findIndex((i) => i.employeeId === employeeId);

    // If no id employee match is found
    if (index === -1) {
        throw new Error(`Item with ID ${employeeId} not found`);
    }
    // else remove the employee
    employees.splice(index, 1);
};

// New Endpoint

// Get employee by branch id
export const getEmployeesByBranch = async (branchId: string): Promise<Employee[]> => {
    return employees.filter((employee) => employee.employeeBranchId === branchId);
};

// Get employee by department 
export const getEmployeesByDepartment = async (department: string): Promise<Employee[]> => {
    return employees.filter((employee) => employee.employeeDepartment.toLowerCase() === department.toLowerCase());
};