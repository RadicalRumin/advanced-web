'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@/lib/auth';
import { herstelBoekje } from '@/lib/boekjes';
import BoekjeList from '@/components/BoekjeList';
import { useRouter } from 'next/navigation';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ArchiefPage() {
  const user = useUser();
  const [boekjes, setBoekjes] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'boekjes'),
      where('eigenaarId', '==', user.uid),
      where('gearchiveerd', '==', true)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBoekjes(data);
    });
    return () => unsub();
  }, [user]);

  async function handleHerstel(id: string) {
    await herstelBoekje(id);
  }

  if (!user) return <p>Even inloggen...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gearchiveerde Boekjes</h1>
      <button onClick={() => router.push('/boekjes')} className="text-sm text-blue-600 underline mb-4">← Terug naar overzicht</button>
      <BoekjeList boekjes={boekjes} onArchive={handleHerstel} archiveMode={true} />
    </div>
  );
}