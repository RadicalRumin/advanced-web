import { db } from './firebase';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query
} from 'firebase/firestore';

const categorieCollection = collection(db, 'categories');

export function subscribeToCategories(
  callback: (categories: {
    id: string;
    naam: string;
    omschrijving: string;
    max?: number;
    einddatum?: string;
  }[]) => void
) {
  const q = query(categorieCollection);
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data as any); // of een expliciet type cast als nodig
  });
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
  const ref = doc(db, 'categories', id); // was 'categories'
  await updateDoc(ref, {
    naam,
    omschrijving,
    max: typeof max === 'number' ? max : null,
    einddatum: einddatum || null
  });
}

export async function deleteCategorie(id: string) {
  const ref = doc(db, 'categories', id); // was 'categories'
  await deleteDoc(ref);
}
