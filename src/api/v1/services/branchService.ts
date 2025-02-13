import { Branch } from "../models/branchModel";
import {
    createDocument,
    getDocuments,
    updateDocument,
    deleteDocument
} from "../repositories/firestoreRepositoriy";

const COLLECTION = "branches";

// Fetch all branches from Firestore
export const getAllBranches = async (): Promise<Branch[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return { branchId: doc.id, ...data } as Branch;
    });
};

// Get branch by ID
export const getBranchById = async (branchId: string): Promise<Branch | null> => {
    const snapshot = await getDocuments(COLLECTION);
    const branch = snapshot.docs
        .map((doc) => ({ branchId: doc.id, ...doc.data() } as Branch))
        .find((branch) => branch.branchId === branchId);
    return branch || null;
};

// Create a new branch
export const createBranch = async (branch: Partial<Branch>): Promise<Branch> => {
    const id = await createDocument(COLLECTION, branch);
    return { branchId: id, ...branch } as Branch;
};

// Update a branch by ID
export const updateBranch = async (
    branchId: string,
    updates: Partial<Branch>
): Promise<Branch> => {
    await updateDocument(COLLECTION, branchId, updates);
    return { branchId, ...updates } as Branch;
};

// Delete a branch by ID
export const deleteBranch = async (branchId: string): Promise<void> => {
    await deleteDocument(COLLECTION, branchId);
};
