import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
  updateDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';

export async function getBoekjesByUser(userId: string) {
  const q = query(collection(db, 'boekjes'), where('eigenaarId', '==', userId), where('gearchiveerd', '==', false));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addBoekje(naam: string, omschrijving: string, eigenaarId: string) {
  await addDoc(collection(db, 'boekjes'), {
    naam,
    omschrijving,
    eigenaarId,
    gearchiveerd: false,
    aangemaaktOp: Timestamp.now(),
  });
}

export async function archiveerBoekje(id: string) {
  await updateDoc(doc(db, 'boekjes', id), {
    gearchiveerd: true,
  });
}

export async function herstelBoekje(id: string) {
  await updateDoc(doc(db, 'boekjes', id), {
    gearchiveerd: false,
  });
}

export async function updateBoekje(id: string, naam: string, omschrijving: string) {
  await updateDoc(doc(db, 'boekjes', id), {
    naam,
    omschrijving,
  });
}

export function subscribeToBoekjes(userId: string, gearchiveerd: boolean, callback: (data: any[]) => void) {
  const q = query(
    collection(db, 'boekjes'),
    where('eigenaarId', '==', userId),
    where('gearchiveerd', '==', gearchiveerd)
  );
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
}
