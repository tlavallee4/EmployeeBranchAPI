import { Request, Response, NextFunction } from "express"; 
// Importing types from Express:

export type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
// Defining a *Middleware function for Express middleware functions.

export type RequestBody = Record<string, unknown>;
// RequestBody: a generic object where keys are string and values are unknown

export type RequestData<T extends RequestBody = RequestBody> = {
  body: T;
  params: Record<string, string>;
  query: Record<string, string | string[]>;
};
// RequestData: a generic type that represents an Express request
// T: generic type, T accepts anything. can be anything 