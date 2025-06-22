import { db } from './firebase';
import {
  collection,
  addDoc,
  doc,
  where,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  getDoc,
  getDocs
} from 'firebase/firestore';

export type Category = {
  id: string;
  naam: string;
  omschrijving: string;
  max: number;
  einddatum?: string;
}

const categorieCollection = collection(db, 'categories');

export function subscribeToCategories(
  callback: (categories: Category[]) => void
) {
  const q = query(categorieCollection);
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data as any); 
  });
}

export async function getCategory(userId : string, id: string) {
  const ref = doc(db, 'categories', id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) {
    throw new Error(`Category with ID "${id}" not found`);
  }
  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Category;
}

export async function getCategories(userId: string) {
  const snapshot = await getDocs(
    query(collection(db, 'categorieen'), where('eigenaarId', '==', userId))
  );
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Category[];
} 

export async function addCategorie(
  naam: string,
  omschrijving: string,
  max: number | null,
  einddatum: string | null
) {
  const docRef = await addDoc(categorieCollection, {
    naam,
    omschrijving,
    max,
    einddatum,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}

export async function updateCategorie(
  id: string,
  naam: string,
  omschrijving: string,
  max?: number,
  einddatum?: string | null
) {
  const ref = doc(db, 'categories', id);
  await updateDoc(ref, {
    naam,
    omschrijving,
    max: typeof max === 'number' ? max : null,
    einddatum: einddatum || null
  });
}

export async function deleteCategorie(id: string) {
  const ref = doc(db, 'categories', id); 
  await deleteDoc(ref);
}