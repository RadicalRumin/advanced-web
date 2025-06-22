'use client';
import { useState } from 'react';

export default function BoekjeForm({ onSubmit }: { onSubmit: (naam: string, omschrijving: string) => void }) {
  const [naam, setNaam] = useState('');
  const [omschrijving, setOmschrijving] = useState('');
  const [foutmelding, setFoutmelding] = useState('');

  function handleSubmit() {
    if (naam.trim().length < 3) {
      setFoutmelding('De naam moet minstens 3 karakters bevatten.');
      return;
    }
    setFoutmelding('');
    onSubmit(naam, omschrijving);
    setNaam('');
    setOmschrijving('');
  }

  return (
    <div className="space-y-2 mb-4">
      <input
        value={naam}
        onChange={e => setNaam(e.target.value)}
        placeholder="Naam"
        className="border p-2 w-full"
      />
      <input
        value={omschrijving}
        onChange={e => setOmschrijving(e.target.value)}
        placeholder="Omschrijving"
        className="border p-2 w-full"
      />
      {foutmelding && <p className="text-red-600 text-sm">{foutmelding}</p>}
      <button onClick={handleSubmit} className="bg-blue-600 text-white p-2 w-full">
        Toevoegen
      </button>
    </div>
  );
}