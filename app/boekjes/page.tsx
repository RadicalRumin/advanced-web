'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@/lib/auth';
import { getBoekjesByUser, addBoekje, archiveerBoekje, updateBoekje } from '@/lib/boekjes';
import BoekjeForm from '@/components/BoekjeForm';
import BoekjeList from '@/components/BoekjeList';

export default function BoekjesPage() {
  const user = useUser();
  const [boekjes, setBoekjes] = useState<any[]>([]);

  async function laadBoekjes() {
    if (user) {
      const data = await getBoekjesByUser(user.uid);
      setBoekjes(data);
    }
  }

  async function handleAdd(naam: string, omschrijving: string) {
    if (user && naam) {
      await addBoekje(naam, omschrijving, user.uid);
      laadBoekjes();
    }
  }

  async function handleArchive(id: string) {
    await archiveerBoekje(id);
    laadBoekjes();
  }

  async function handleUpdate(id: string, naam: string, omschrijving: string) {
    await updateBoekje(id, naam, omschrijving);
    laadBoekjes();
  }

  useEffect(() => {
    laadBoekjes();
  }, [user]);

  if (!user) return <p>Even inloggen...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mijn Huishoudboekjes</h1>
      <BoekjeForm onSubmit={handleAdd} />
      <BoekjeList boekjes={boekjes} onArchive={handleArchive} onUpdate={handleUpdate} />
    </div>
  );
}
