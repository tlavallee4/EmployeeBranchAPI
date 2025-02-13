// Import Joi for data validation and ObjectSchema type for defining schema structure
import Joi, { ObjectSchema } from "joi"; 

// Defining a schema using Joi's object validation method for employee data
export const employeeSchema: ObjectSchema = Joi.object({ 
  name: Joi.string().required().messages({
    "any.required": "Employee name is required.",
    "string.empty": "Employee name cannot be empty.",
  }),
  // name required, If missing, it triggers validation message

  position: Joi.string().required().messages({
    "any.required": "Employee position is required.",
    "string.empty": "Employee position cannot be empty.",
  }),
  // position required, triggers validation message if left empty

  email: Joi.string().email().required().messages({
    "any.required": "Employee email is required.",
    "string.empty": "Employee email cannot be empty.",
    "string.email": "Employee email must be a valid email address.",
  }),
  // email is required, triggers validation messages if empty or invalid

  branchId: Joi.string().required().messages({
    "any.required": "Branch ID is required.",
    "string.empty": "Branch ID cannot be empty.",
  }),
  // branch id required, triggers validation message if left empty
});
