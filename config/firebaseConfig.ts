// Import Firebase Admin SDK functions for initializing the app
import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

// Import service account credentials (JSON file) for Firebase authentication
import serviceAccount from "../assignment-03-bd113-firebase-adminsdk-fbsvc-c4b3c4bcfd.json";

// Initialize Firebase Admin SDK with service account credentials
initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

// Get a reference to the Firestore database
const db: Firestore = getFirestore();

// Export the Firestore database instance for use in other files
export { db };
