// Import Firestore database instance from Firebase config
import { db } from "../../../../config/firebaseConfig";

// Import Firestore types for working with timestamps and field values
import { FieldValue, Timestamp } from "firebase-admin/firestore";

// Define a type alias for supported Firestore data types
type FirestoreDataTypes =
  | string
  | number
  | boolean
  | null
  | Timestamp
  | FieldValue;

// Define an interface representing key-value pairs for Firestore document fields
interface FieldValuePair {
  fieldName: string; // Name of the field
  fieldValue: FirestoreDataTypes; // Value to match for deletion
}

/**
 * Runs a Firestore transaction.
 * Ensures multiple read/write operations occur atomically.
 * 
 * @param operations - A function that performs Firestore operations inside the transaction.
 * @returns The result of the transaction.
 */
export const runTransaction = async <T>(
  operations: (transaction: FirebaseFirestore.Transaction) => Promise<T>
): Promise<T> => {
  try {
    return await db.runTransaction(operations);
  } catch (error) {
    console.error(`Transaction failed: ${error}`);
    throw new Error("Transaction failed");
  }
};

/**
 * Creates a Firestore document with an optional custom ID.
 * If no ID is provided, Firestore will generate one automatically.
 * 
 * @param collectionName - The name of the Firestore collection.
 * @param data - The data to store in the document.
 * @param id - (Optional) The document ID to use.
 * @returns The document ID of the newly created document.
 */
export const createDocument = async <T>(
  collectionName: string,
  data: Partial<T>,
  id?: string
): Promise<string> => {
  try {
    let docRef: FirebaseFirestore.DocumentReference;

    if (id) {
      // Use provided ID to create the document
      docRef = db.collection(collectionName).doc(id);
      await docRef.set(data);
    } else {
      // Auto-generate an ID
      docRef = await db.collection(collectionName).add(data);
    }

    return docRef.id;
  } catch (error) {
    console.error(`Failed to create document: ${error}`);
    throw new Error("Failed to create document");
  }
};

/**
 * Retrieves all documents from a Firestore collection.
 * 
 * @param collectionName - The name of the Firestore collection.
 * @returns A QuerySnapshot containing all documents in the collection.
 */
export const getDocuments = async (
  collectionName: string
): Promise<FirebaseFirestore.QuerySnapshot> => {
  try {
    return await db.collection(collectionName).get();
  } catch (error) {
    console.error(`Failed to fetch documents: ${error}`);
    throw new Error("Failed to fetch documents");
  }
};

/**
 * Retrieves a single document from Firestore by its ID.
 * 
 * @param collectionName - The name of the Firestore collection.
 * @param id - The document ID to retrieve.
 * @returns The DocumentSnapshot or null if not found.
 */
export const getDocumentById = async <T>(
  collectionName: string,
  id: string
): Promise<FirebaseFirestore.DocumentSnapshot | null> => {
  try {
    const doc: FirebaseFirestore.DocumentSnapshot = await db
      .collection(collectionName)
      .doc(id)
      .get();

    return doc?.exists ? doc : null;
  } catch (error) {
    console.error(`Failed to fetch document: ${error}`);
    throw new Error("Failed to fetch document");
  }
};

/**
 * Updates an existing Firestore document.
 * 
 * @param collectionName - The name of the Firestore collection.
 * @param id - The document ID to update.
 * @param data - The updated data fields.
 */
export const updateDocument = async <T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  try {
    await db.collection(collectionName).doc(id).update(data);
  } catch (error) {
    console.error(`Failed to update document: ${error}`);
    throw new Error("Failed to update document");
  }
};

/**
 * Deletes a single Firestore document.
 * If a transaction is provided, the deletion will be part of the transaction.
 * 
 * @param collectionName - The name of the Firestore collection.
 * @param id - The document ID to delete.
 * @param transaction - (Optional) Firestore transaction object.
 */
export const deleteDocument = async (
  collectionName: string,
  id: string,
  transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
  try {
    const docRef: FirebaseFirestore.DocumentReference = db
      .collection(collectionName)
      .doc(id);

    if (transaction) {
      // Delete document inside a transaction
      transaction.delete(docRef);
    } else {
      // Delete document normally
      await docRef.delete();
    }
  } catch (error) {
    console.error(`Failed to delete document: ${error}`);
    throw new Error("Failed to delete document");
  }
};

/**
 * Deletes multiple Firestore documents based on specific field-value conditions.
 * Can be executed within a transaction or as a batch operation.
 * 
 * @param collectionName - The name of the Firestore collection.
 * @param fieldValuePairs - An array of field-value conditions to match documents.
 * @param transaction - (Optional) Firestore transaction object.
 */
export const deleteDocumentsByFieldValues = async (
  collectionName: string,
  fieldValuePairs: FieldValuePair[],
  transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
  try {
    let query: FirebaseFirestore.Query = db.collection(collectionName);

    // Apply all field-value filters
    fieldValuePairs.forEach(({ fieldName, fieldValue }) => {
      query = query.where(fieldName, "==", fieldValue);
    });

    let snapshot: FirebaseFirestore.QuerySnapshot;

    if (transaction) {
      // Get documents inside the transaction
      snapshot = await transaction.get(query);
      snapshot.docs.forEach((doc) => {
        transaction.delete(doc.ref);
      });
    } else {
      // Get documents normally
      snapshot = await query.get();

      // Use a batch write for efficiency
      const batch: FirebaseFirestore.WriteBatch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    }
  } catch (error) {
    console.error(`Failed to delete documents: ${error}`);
    throw new Error("Failed to delete documents");
  }
};
