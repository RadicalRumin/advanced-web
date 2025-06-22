'use client';
import { useState } from 'react';

interface CategorieFormProps {
  onSubmit: (naam: string, omschrijving: string, max: number | null, einddatum: string | null) => void;
}

export default function CategorieForm({ onSubmit }: CategorieFormProps) {
  const [naam, setNaam] = useState('');
  const [omschrijving, setOmschrijving] = useState('');
  const [max, setMax] = useState('');
  const [einddatum, setEinddatum] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (naam.trim().length < 3) {
      setError('Naam moet minimaal 3 karakters zijn.');
      return;
    }
    setError('');
    onSubmit(
      naam.trim(),
      omschrijving.trim(),
      max ? parseFloat(max) : null,
      einddatum || null
    );
    setNaam('');
    setOmschrijving('');
    setMax('');
    setEinddatum('');
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label className="block font-semibold mb-1">Categorie naam</label>
      <input type="text" value={naam} onChange={(e) => setNaam(e.target.value)} className="border p-1 w-full mb-2" />

      <label className="block font-semibold mb-1">Omschrijving</label>
      <input type="text" value={omschrijving} onChange={(e) => setOmschrijving(e.target.value)} className="border p-1 w-full mb-2" />

      <label className="block font-semibold mb-1">Maximaal budget</label>
      <input type="number" value={max} onChange={(e) => setMax(e.target.value)} className="border p-1 w-full mb-2" />

      <label className="block font-semibold mb-1">Einddatum (optioneel)</label>
      <input type="date" value={einddatum} onChange={(e) => setEinddatum(e.target.value)} className="border p-1 w-full mb-2" />

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Toevoegen</button>
    </form>
  );
}
