import { CreateReadStreamOptions } from "fs/promises";

export interface Employee {
    name: string;
    position: string; 
    email: string;
    branchId: string;
}