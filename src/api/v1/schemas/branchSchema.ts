// Import joi for data validation and object schema type for defining schema structure
import Joi, { ObjectSchema } from "joi"; 

// Defining a schema using Joi's object validation method
export const branchSchema: ObjectSchema = Joi.object({ 
  name: Joi.string().optional().messages({
    "any.required": "Branch name is required.",
    "string.empty": "Branch name cannot be empty",
  }),
  // name is an optional string, if empty triggers validation

  address: Joi.string().required().messages({
    "any.required": "Branch address is required.",
    "string.empty": "Branch address cannot be empty.",
  }),
  // address optional string, if empty triggers validation message

  phone: Joi.string().required().messages({
    "any.required": "Branch phone number is required.",
    "string.empty": "Branch phone number cannot be empty.",
  }),
  // phone optional string, if empty triggers validation message 
});
