// Define a generic interface for API responses
export interface ApiResponse<T> {
    status: string; // Indicates the response status: "success" or "error"
    data?: T; // Optional data returned in case of a successful response
    message?: string; // Informational message about the result
    error?: string; // Error message in case of a failure
    code?: string; // Optional error code to assist with debugging
  }
  
  // Function to generate a success response
  export const successResponse = <T>(
    data?: T, // The response data (if applicable)
    message?: string // Optional message providing additional context
  ): ApiResponse<T> => ({
    status: "success", // Set status to "success"
    data, // Attach data (if provided)
    message, // Attach message (if provided)
  });
  
  // Function to generate an error response
  export const errorResponse = (
    message: string, // Error message describing the issue
    code?: string // Optional error code for easier debugging
  ): ApiResponse<null> => ({
    status: "error", // Set status to "error"
    message, // Include the error message
    code, // Include an optional error code
  });
  