import { Transaction } from '@/app/boekjes/[id]/page';
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


export async function addTransaction(boekjeId : string, transaction : Transaction) {

  const collect = collection(db, `boekjes/${boekjeId}/transactions`);
  const item = {
    ...transaction,
    date: transaction.date ?? new Date().toISOString(),
    createdAt: Date.now()
  }
  const docref = await addDoc(collect, item);

  return { docref, ...transaction };
};

export async function getTransactions(boekjeId: string, month : Date) {
  const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
  const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 1);

  const q = query(
    collection(db, `boekjes/${boekjeId}/transactions`),
    where("date", ">=", startDate.toISOString()),
    where("date", "<=", endDate.toISOString()),
    orderBy("date", "desc")
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      amount: data.amount,
      type: data.type,
      category: data.category,
      date: data.date,
      createdAt: data.createdAt
    };
  });
};

export async function deleteTransaction(boekjeId: string, transactionId : string) {
  await deleteDoc(doc(db, `boekjes/${boekjeId}/transactions/${transactionId}`));
};
