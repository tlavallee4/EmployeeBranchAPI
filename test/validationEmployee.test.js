const Joi = require('joi');
const { employeeSchema } = require('../src/api/v1/schemas/employeeSchema'); // Update path as needed

describe('Employee Schema Validation', () => {
  it('should validate correct employee data', () => {
    const validData = { name: 'John Doe', position: 'Manager', email: 'john@example.com', branchId: '123' };
    const { error } = employeeSchema.validate(validData);
    expect(error).toBeUndefined();
  });

  it('should return an error for missing name', () => {
    const invalidData = { position: 'Manager', email: 'john@example.com', branchId: '123' };
    const { error } = employeeSchema.validate(invalidData);
    expect(error).toBeDefined();
  });

  it('should return an error for an invalid email format', () => {
    const invalidData = { name: 'John Doe', position: 'Manager', email: 'invalid-email', branchId: '123' };
    const { error } = employeeSchema.validate(invalidData);
    expect(error).toBeDefined();
  });
});
