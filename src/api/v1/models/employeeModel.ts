/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         employeeId:
 *           type: string
 *           description: The unique identifier for an employee.
 *         employeeName:
 *           type: string
 *           description: The full name of the employee.
 *         employeePosition:
 *           type: string
 *           description: The employee's job title.
 *         employeeDepartment:
 *           type: string
 *           description: The department where the employee works.
 *         employeeEmail:
 *           type: string
 *           format: email
 *           description: The employee's email address.
 *         employeePhone:
 *           type: string
 *           description: The employee's phone number.
 *         employeeBranchId:
 *           type: string
 *           description: The ID of the branch the employee is associated with.
 */
export interface Employee {
    employeeId: string;
    employeeName: string;
    employeePosition: string;
    employeeDepartment: string;
    employeeEmail: string;
    employeePhone: string;
    employeeBranchId: string;
  }  