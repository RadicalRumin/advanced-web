'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@/lib/auth';
import { getBoekjesByUser, herstelBoekje } from '@/lib/boekjes';
import BoekjeList from '@/components/BoekjeList';
import { useRouter } from 'next/navigation';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

async function getGearchiveerdeBoekjes(userId: string) {
  const q = query(collection(db, 'boekjes'), where('eigenaarId', '==', userId), where('gearchiveerd', '==', true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export default function ArchiefPage() {
  const user = useUser();
  const [boekjes, setBoekjes] = useState<any[]>([]);
  const router = useRouter();

  async function laadBoekjes() {
    if (user) {
      const data = await getGearchiveerdeBoekjes(user.uid);
      setBoekjes(data);
    }
  }

  async function handleHerstel(id: string) {
    await herstelBoekje(id);
    laadBoekjes();
  }

  useEffect(() => {
    laadBoekjes();
  }, [user]);

  if (!user) return <p>Even inloggen...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gearchiveerde Boekjes</h1>
      <button onClick={() => router.push('/boekjes')} className="text-sm text-blue-600 underline mb-4">← Terug naar overzicht</button>
      <BoekjeList boekjes={boekjes} onArchive={handleHerstel} archiveMode={true} />
    </div>
  );
}
