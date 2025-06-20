'use client';
import Link from 'next/link';

export default function BoekjeList({ boekjes, onArchive }: { boekjes: any[], onArchive: (id: string) => void }) {
  return (
    <ul className="space-y-2">
      {boekjes.map((b) => (
        <li key={b.id} className="border p-4 rounded flex justify-between items-start">
          <div>
            <Link href={`/boekjes/${b.id}`} className="font-semibold hover:underline">
              {b.naam}
            </Link>
            <p className="text-sm text-gray-600">{b.omschrijving}</p>
          </div>
          <button onClick={() => onArchive(b.id)} className="text-sm text-red-600">Archiveer</button>
        </li>
      ))}
    </ul>
  );
}