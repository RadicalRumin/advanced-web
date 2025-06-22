'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@/lib/auth';
import { herstelBoekje, subscribeToBoekjes } from '@/lib/boekjes';
import BoekjeList from '@/components/BoekjeList';
import { useRouter } from 'next/navigation';

export default function ArchiefPage() {
  const user = useUser();
  const [boekjes, setBoekjes] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToBoekjes(user.uid, true, setBoekjes);
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