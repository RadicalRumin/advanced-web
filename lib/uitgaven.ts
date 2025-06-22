import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,

  doc,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';


export const addTransaction = async (userId,  transaction) => {
  const docRef = await addDoc(
    collection(db, `users/${userId}/transactions`),
    {
      ...transaction,
      date: transaction.date || new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
  );
  return { id: docRef.id, ...transaction };
};

export const getTransactions = async (userId, month) => {
  const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
  const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);

  const q = query(
    collection(db, `users/${userId}/transactions`),
    where("date", ">=", startDate.toISOString()),
    where("date", "<=", endDate.toISOString()),
    orderBy("date", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deleteTransaction = async (userId, id) => {
  await deleteDoc(doc(db, `users/${userId}/transactions/${id}`));
};
