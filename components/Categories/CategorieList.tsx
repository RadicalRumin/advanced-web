'use client';
import { useState } from 'react';

interface Categorie {
  id: string;
  naam: string;
  omschrijving: string;
  max?: number;
  einddatum?: string;
}

interface CategorieListProps {
  categories: Categorie[];
  onUpdate?: (id: string, naam: string, omschrijving: string, max?: number, einddatum?: string | null) => void;
  onDelete?: (id: string) => void;
}

export default function CategorieList({ categories, onUpdate, onDelete }: CategorieListProps) {
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ naam: '', omschrijving: '', max: '', einddatum: '' });

  function startEdit(cat: Categorie) {
    setEditId(cat.id);
    setFormData({
      naam: cat.naam,
      omschrijving: cat.omschrijving,
      max: cat.max?.toString() || '',
      einddatum: cat.einddatum || ''
    });
  }

  function submitEdit(id: string) {
    if (onUpdate) {
      onUpdate(id, formData.naam, formData.omschrijving, formData.max ? parseFloat(formData.max) : undefined, formData.einddatum || null);
    }
    setEditId(null);
  }

  return (
    <ul className="space-y-2">
      {categories.map((cat) => (
        <li key={cat.id} className="border rounded p-2">
          {editId === cat.id ? (
            <div className="space-y-1">
              <input type="text" value={formData.naam} onChange={(e) => setFormData({ ...formData, naam: e.target.value })} className="border p-1 w-full" />
              <input type="text" value={formData.omschrijving} onChange={(e) => setFormData({ ...formData, omschrijving: e.target.value })} className="border p-1 w-full" />
              <input type="number" value={formData.max} onChange={(e) => setFormData({ ...formData, max: e.target.value })} className="border p-1 w-full" />
              <input type="date" value={formData.einddatum} onChange={(e) => setFormData({ ...formData, einddatum: e.target.value })} className="border p-1 w-full" />
              <button onClick={() => submitEdit(cat.id)} className="text-green-600 hover:underline text-sm">Opslaan</button>
            </div>
          ) : (
            <>
              <div className="font-bold">{cat.naam}</div>
              <div className="text-sm text-gray-600">{cat.omschrijving}</div>
              {typeof cat.max === 'number' && (
                <div className="text-sm text-gray-800">Maximaal budget: €{cat.max.toFixed(2)}</div>
              )}
              {cat.einddatum && (
                <div className="text-sm text-gray-800">Einddatum: {new Date(cat.einddatum).toLocaleDateString()}</div>
              )}
              {(onUpdate || onDelete) && (
                <div className="mt-2 space-x-2">
                  {onUpdate && (
                    <button onClick={() => startEdit(cat)} className="text-blue-600 hover:underline text-sm">Wijzig</button>
                  )}
                  {onDelete && (
                    <button onClick={() => onDelete(cat.id)} className="text-red-600 hover:underline text-sm">Verwijder</button>
                  )}
                </div>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}