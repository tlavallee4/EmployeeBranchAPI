import Joi, { ObjectSchema } from "joi"; 

export const branchSchema: ObjectSchema = Joi.object({ 
  name: Joi.string().optional().messages({
    "any.required": "Branch name is required.",
    "string.empty": "Branch name cannot be empty",
  }),

  address: Joi.string().required().messages({
    "any.required": "Branch address is required.",
    "string.empty": "Branch address cannot be empty.",
  }),

  phone: Joi.string().required().messages({
    "any.required": "Branch phone number is required.",
    "string.empty": "Branch phone number cannot be empty.",
  }),
});
