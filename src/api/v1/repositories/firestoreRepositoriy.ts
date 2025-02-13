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
