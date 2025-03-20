# Project Overview

## Employee & Branch API 

- The API we have created using node, express, and typescript allows users to manage employees and branches. It uses CRUD to create, read, update, and delete employees and branches which ensuring security through helmet and cors. 

## Installation Instructions

### To install the project the steps are: 
- 1. clone the repository (git clone https://github.com/tlavallee4/assignment-05-api.git)
- 2. Install npm (npm install)
- 3. Create an .env file 
- 4. Add all the firebase variables including project id, client email, and private key
- 5. Run the server (npm start)

## Example Usage

###  To use the API 
#### Get all employees in Postman - create a new request GET http://localhost:3000/api/v1/employees
- Response : [
  {
    "employeeId": "A1B2C3",
    "employeeName": "Alice Johnson",
    "employeePosition": "Branch Manager",
    "employeeDepartment": "Management",
    "employeeEmail": "alice.johnson@pixell-river.com",
    "employeePhone": "604-555-0148",
    "employeeBranchId": "1"
  }
]

#### Create new employee in Postman - create a new request POST http://localhost:3000/api/v1/employees
- Request in Json Body: {
    "employeeName": "John Doe",
    "employeePosition": "Developer",
    "employeeDepartment": "IT",
    "employeeEmail": "john.doe@example.com",
    "employeePhone": "123-456-7890",
    "employeeBranchId": "2"
  }'

  - Response : [{
  "message": "Employee created successfully.",
  "data": {
    "employeeId": "X7Y8Z9",
    "employeeName": "John Doe",
    "employeePosition": "Developer",
    "employeeDepartment": "IT",
    "employeeEmail": "john.doe@example.com",
    "employeePhone": "123-456-7890",
    "employeeBranchId": "2"
  }
}]


## Link to Public Documentation

https://tlavallee4.github.io/assignment-05-api-docs/


## Accessing OpenAPI Locally

http://localhost:3000/api-docs/
