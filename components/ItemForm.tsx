'use client';
import { useState } from 'react';

interface ItemFormProps {
  label: string;
  initialValues?: { naam?: string; omschrijving?: string };
  onSubmit: (naam: string, omschrijving: string) => void;
  submitLabel?: string;
  minNameLength?: number;
}

export default function ItemForm({
  label,
  initialValues = {},
  onSubmit,
  submitLabel = 'Opslaan',
  minNameLength = 3,
}: ItemFormProps) {
  const [naam, setNaam] = useState(initialValues.naam || '');
  const [omschrijving, setOmschrijving] = useState(initialValues.omschrijving || '');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (naam.trim().length < minNameLength) {
      setError(`${label} naam moet minimaal ${minNameLength} karakters zijn.`);
      return;
    }
    setError('');
    onSubmit(naam.trim(), omschrijving.trim());
    setNaam('');
    setOmschrijving('');
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label className="block font-semibold mb-1">{label} naam</label>
      <input
        type="text"
        value={naam}
        onChange={(e) => setNaam(e.target.value)}
        className="border p-1 w-full mb-2"
      />
      <label className="block font-semibold mb-1">Omschrijving</label>
      <input
        type="text"
        value={omschrijving}
        onChange={(e) => setOmschrijving(e.target.value)}
        className="border p-1 w-full mb-2"
      />
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
        {submitLabel}
      </button>
    </form>
  );
} 