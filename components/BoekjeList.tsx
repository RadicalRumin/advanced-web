'use client';

export default function BoekjeList({ boekjes, onArchive }: { boekjes: any[], onArchive: (id: string) => void }) {
  return (
    <ul className="space-y-2">
      {boekjes.map((b) => (
        <li key={b.id} className="border p-4 rounded flex justify-between">
          <div>
            <p className="font-semibold">{b.naam}</p>
            <p className="text-sm text-gray-600">{b.omschrijving}</p>
          </div>
          <button onClick={() => onArchive(b.id)} className="text-sm text-red-600">Archiveer</button>
        </li>
      ))}
    </ul>
  );
}