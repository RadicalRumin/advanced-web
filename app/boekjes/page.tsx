'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@/lib/auth';
import { addBoekje, archiveerBoekje, updateBoekje } from '@/lib/boekjes';
import BoekjeForm from '@/components/BoekjeForm';
import BoekjeList from '@/components/BoekjeList';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function BoekjesPage() {
  const user = useUser();
  const [boekjes, setBoekjes] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'boekjes'),
      where('eigenaarId', '==', user.uid),
      where('gearchiveerd', '==', false)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBoekjes(data);
    });
    return () => unsub();
  }, [user]);

  async function handleAdd(naam: string, omschrijving: string) {
    if (user && naam) {
      await addBoekje(naam, omschrijving, user.uid);
    }
  }

  async function handleArchive(id: string) {
    await archiveerBoekje(id);
  }

  async function handleUpdate(id: string, naam: string, omschrijving: string) {
    await updateBoekje(id, naam, omschrijving);
  }

  if (!user) return <p>Even inloggen...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mijn Huishoudboekjes</h1>
      <BoekjeForm onSubmit={handleAdd} />
      <BoekjeList boekjes={boekjes} onArchive={handleArchive} onUpdate={handleUpdate} />
    </div>
  );
}
