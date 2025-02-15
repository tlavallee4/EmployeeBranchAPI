# Debugging Analysis

## Scenario 1: validateRequest

- **Breakpoint Location:** validate.ts (Line 24)
- **Objective:** Ensure update requests pass Joi validation

### Debugger Observations

- **Variable States:**
  - req.body, req.params, and req.query are being merged into a single object for validation.
- **Call Stack:**
  - function calls are shown from src/api/v1 that API is being executed.

- **Behavior:**
  - The debugger is paused inside validate.ts, showing that the request is being processed
  - The validateRequest function is merging request data into a single object before validation

### Analysis
 - This confirms that request data is correctly merged before validation & the debugger shows that validation is being executed as expected.


## Scenario 2: deleteBranch

- **Breakpoint Location:** branchController.ts (Line 82)
- **Objective:** Confirm proper handling of update and delete operations in Firestore.

### Debugger Observations

- **Variable States:**
  - deleteBranch and createBranch is actively executing.
  - Firestore queries return expected results based on IDs.

- **Call Stack:**
  - The call is paused inside a function in src/api/v1/
  - require.extension TypeScript files are being processed before executing.

- **Behavior:**
  - Updates modify existing branch records as expected.
  - Deletion requests remove specified documents successfully.

### Analysis

- **Key Takeaways:**
  - Ensuring IDs are passed correctly enables Firestore operations to work properly.

## Scenario 3: branchPhone

- **Breakpoint Location:** branchSchema.ts (Line 18)
- **Objective:** Verify branch phone number validation rules are correctly applied.

### Debugger Observations

- **Variable States:**
  - branchPhone is processed and checked against Joi validation rules.
  - Tested to confirm expected behavior

- **Call Stack:**
  - The request reaches validateRequest middleware.
  - The branchSchema applies the validation rules before proceeding.

- **Behavior:**
  - Phone number validation correctly enforces formatting requirements.
  - Error messages provide clear feedback when input does not meet expected criteria.

### Analysis

- **Key Takeaways:**
  - Joi validation effectively enforces phone number format consistency.