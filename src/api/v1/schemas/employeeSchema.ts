// Import Joi for data validation and ObjectSchema type for defining schema structure
import Joi, { ObjectSchema } from "joi"; 

// Defining a schema using Joi's object validation method for employee data
export const employeeSchema: ObjectSchema = Joi.object({ 
  employeeName: Joi.string().required().messages({
    "any.required": "Employee name is required.",
    "string.empty": "Employee name cannot be empty.",
  }),
  // employeeName required, If missing, it triggers validation message

  employeePosition: Joi.string().required().messages({
    "any.required": "Employee position is required.",
    "string.empty": "Employee position cannot be empty.",
  }),
  // employeePosition required, triggers validation message if left empty

  employeeEmail: Joi.string().email().required().messages({
    "any.required": "Employee email is required.",
    "string.empty": "Employee email cannot be empty.",
    "string.email": "Employee email must be a valid email address.",
  }),
  // employeeEmail is required, triggers validation messages if empty or invalid

  employeeBranchId: Joi.string().required().messages({
    "any.required": "Branch ID is required.",
    "string.empty": "Branch ID cannot be empty.",
  }),
  // employeeBranchId required, triggers validation message if left empty
});