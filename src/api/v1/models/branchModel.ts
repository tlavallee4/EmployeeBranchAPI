/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       properties:
 *         branchId:
 *           type: string
 *           description: The unique identifier for a branch.
 *         branchName:
 *           type: string
 *           description: The name of the branch.
 *         branchAddress:
 *           type: string
 *           description: The physical address of the branch.
 *         branchPhone:
 *           type: string
 *           description: The contact phone number for the branch.
 */
export interface Branch {
    branchId: string;
    branchName: string;
    branchAddress: string;
    branchPhone: string;
  }
  