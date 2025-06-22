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

const categorieCollection = collection(db, 'categorieen');

export function subscribeToCategorieen(
  callback: (categorieën: { id: string; naam: string; omschrijving: string }[]) => void
) {
  const q = query(categorieCollection);
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data as { id: string; naam: string; omschrijving: string }[]);
  });
}

export async function addCategorie(naam: string, omschrijving: string) {
  const docRef = await addDoc(categorieCollection, {
    naam,
    omschrijving,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}

export async function updateCategorie(id: string, naam: string, omschrijving: string) {
  const ref = doc(db, 'categorieen', id);
  await updateDoc(ref, { naam, omschrijving });
}

export async function deleteCategorie(id: string) {
  const ref = doc(db, 'categorieen', id);
  await deleteDoc(ref);
}
