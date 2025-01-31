// Create interface for Branches
export type Branch = {
    branchId: string;
    branchName: string;
    branchAddress: string;
    branchPhone: string;
};

// branches stored
const branches: Branch[] = [
    {
        branchId: "1",
        branchName: "Vancouver Branch",
        branchAddress: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
        branchPhone: "604-456-0022",
    },
    {
        branchId: "2",
        branchName: "Edmonton Branch",
        branchAddress: "7250 82 Ave NW, Edmonton, AB, T6B 0G4",
        branchPhone: "780-468-6800",
    },
    {
        branchId: "3",
        branchName: "Arborg Branch",
        branchAddress: "317-A Fisher Road, Arborg, MB, R0C 0A0",
        branchPhone: "204-555-3461",
    },
    {
        branchId: "4",
        branchName: "Regina Branch",
        branchAddress: "3085 Albert, Regina, SK, S4S 0B1",
        branchPhone: "306-640-2877",
    },
];

// Get all branches
export const getBranches = async (): Promise<Branch[]> => {
    return branches;
};

// Create a new branch
export const createBranch = async (branch: {
    branchName: string;
    branchAddress: string;
    branchPhone: string;
}): Promise<Branch> => {
    const newBranch: Branch = { branchId: Date.now().toString(), ...branch };
    branches.push(newBranch);
    return newBranch;
};

// Get branch by ID
export const getBranchById = async (id: string): Promise<Branch | null> => {
    return branches.find((branch) => branch.branchId === id) || null;
};

// Update branch
export const updateBranch = async (
    branchId: string,
    updates: { branchName?: string; branchAddress?: string; branchPhone?: string }
): Promise<Branch> => {
    const index: number = branches.findIndex((branch) => branch.branchId === branchId);
    if (index === -1) {
        throw new Error(`Branch with ID ${branchId} not found`);
    }
    branches[index] = { ...branches[index], ...updates };
    return branches[index];
};

// Delete branch
export const deleteBranch = async (branchId: string): Promise<void> => {
    const index: number = branches.findIndex((branch) => branch.branchId === branchId);

    if (index === -1) {
        throw new Error(`Branch with ID ${branchId} not found`);
    }
    branches.splice(index, 1);
};
