// Import joi for data validation and object schema type for defining schema structure
import Joi, { ObjectSchema } from "joi"; 

// Defining a schema using Joi's object validation method
export const branchSchema: ObjectSchema = Joi.object({ 
  branchName: Joi.string().required().messages({
    "any.required": "Branch name is required.",
    "string.empty": "Branch name cannot be empty.",
  }),
  // optional string, if empty triggers validation message

  branchAddress: Joi.string().required().messages({
    "any.required": "Branch address is required.",
    "string.empty": "Branch address cannot be empty.",
  }),
  // optional string, if empty triggers validation message 

  branchPhone: Joi.string().required().messages({
    "any.required": "Branch phone number is required.",
    "string.empty": "Branch phone number cannot be empty.",
  }),
  // optional string, if empty triggers validation message 
});