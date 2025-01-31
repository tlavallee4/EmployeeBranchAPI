# Debugging Analysis

## Scenario 1: Server initialized

- **Breakpoint Location:** `src/server.ts` at line 11
- **Objective:** To confirm the `PORT` variable is properly initialized and used for the server to start listening for incoming requests.

### Debugger Observations

- **Variable States:**
  - `PORT`: `3000`

- **Call Stack:**
  - The `app.listen(PORT)` method is called in `server.ts` to start the server.
  - The execution pauses at the `console.log` statement, confirming the server is running on the correct port.

- **Behavior:**
  - The server initializes successfully and logs that it is on port `3000`.

### Analysis
- The `PORT` variable is initialized correctly, and the server npm starts without issues.
- No unexpected behavior
- Shows that the server is running and waiting for API requests.



## Scenario 2: Update Branch

- **Breakpoint Location:** branchController.ts, line 57
- **Objective:** To verify the call to updateBranch and analyze the branchController role in updating branch

### Debugger Observations

- **Variable States:**
  - branchService: Contains methods `getBranches`, `createBranch`, `updateBranch`, and `deleteBranch`
  - `req.params`: Undefined (as observed in the watch tab).

- **Call Stack:**
  - Execution pauses at the await branchService.updateBranch line where the req.params.id and req.body are passed to the service method.

- **Behavior:**
  - The controller attempts to process the branch update, but `req.params.id` is undefined

### Analysis

- `req.params` is undefined, which may result in an error during the update process?
- Troubleshooting for validation of `req.params.id`.



## Scenario 3: Employee Creation

- **Breakpoint Location:** employeeController.ts, line 22
- **Objective:** 

### Debugger Observations

- **Variable States:**
- employeeService: methods for managing employees, such as getEmployees, createEmployee, updateEmployee, and deleteEmployee
- __filename: "C:\\Users\\Tanelle\\..." full path of the employeeController.ts file

- **Call Stack:**
  - `createEmployee` is triggered from the employee creation route API call. including createEmployee method

- **Behavior:**
  - The controller calls employeeService.createEmployee with the req.body to create a new employee.

### Analysis

- employeeService object is initialized and works in the controller
- Could add error handing for req
- This shows API requests to the services for creating new employee records