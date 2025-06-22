'use client';
import { useState } from 'react';

interface Item {
  id: string;
  [key: string]: any;
}

interface ItemListProps {
  items: Item[];
  onEdit?: (id: string, naam: string, omschrijving: string) => void;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
  titleProp?: string;
  descriptionProp?: string;
}

export default function ItemList({
  items,
  onEdit,
  onDelete,
  onArchive,
  titleProp = 'naam',
  descriptionProp = 'omschrijving',
}: ItemListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [naam, setNaam] = useState('');
  const [omschrijving, setOmschrijving] = useState('');
  const [error, setError] = useState('');

  function startEdit(item: Item) {
    setEditingId(item.id);
    setNaam(item[titleProp] || '');
    setOmschrijving(item[descriptionProp] || '');
  }

  function confirmEdit() {
    if (naam.trim().length < 3) {
      setError('Naam moet minimaal 3 karakters bevatten.');
      return;
    }
    if (onEdit && editingId) {
      onEdit(editingId, naam.trim(), omschrijving.trim());
    }
    cancelEdit();
  }

  function cancelEdit() {
    setEditingId(null);
    setNaam('');
    setOmschrijving('');
    setError('');
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id} className="border p-2 rounded">
          {editingId === item.id ? (
            <div>
              <input
                type="text"
                value={naam}
                onChange={(e) => setNaam(e.target.value)}
                className="border p-1 w-full mb-1"
              />
              <input
                type="text"
                value={omschrijving}
                onChange={(e) => setOmschrijving(e.target.value)}
                className="border p-1 w-full mb-1"
              />
              {error && <p className="text-red-600 text-sm mb-1">{error}</p>}
              <div className="flex gap-2">
                <button onClick={confirmEdit} className="text-sm text-green-700">Opslaan</button>
                <button onClick={cancelEdit} className="text-sm text-gray-600">Annuleren</button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{item[titleProp]}</p>
                <p className="text-sm text-gray-600">{item[descriptionProp]}</p>
              </div>
              <div className="flex gap-2 text-sm">
                {onEdit && <button onClick={() => startEdit(item)} className="text-blue-600">Wijzig</button>}
                {onDelete && <button onClick={() => onDelete(item.id)} className="text-red-600">Verwijder</button>}
                {onArchive && <button onClick={() => onArchive(item.id)} className="text-yellow-600">Archiveer</button>}
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
