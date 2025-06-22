"use client";
import { useState, useEffect } from "react";
import { getAllUserTransactionsViaBoekjes } from "@/lib/uitgaven";

interface Categorie {
  id: string;
  naam: string;
  omschrijving: string;
  max: number;
  einddatum?: string;
}

interface CategorieListProps {
  categories: Categorie[];
  onUpdate?: (
    id: string,
    naam: string,
    omschrijving: string,
    max: number,
    einddatum?: string | null
  ) => void;
  onDelete?: (id: string) => void;
}

export default function CategorieList({
  categories: categories,
  onUpdate,
  onDelete,
}: CategorieListProps) {
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    naam: "",
    omschrijving: "",
    max: "",
    einddatum: "",
  });
  const [uitgaven, setUitgaven] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchData() {
      const allTotals: Record<string, number> = {};
      const month = new Date();
      const transacties = await getAllUserTransactionsViaBoekjes(month);

      for (const cat of categories) {
        const sum = transacties
          .filter((t) => t.category === cat.naam && t.type === "expense")
          .reduce((acc, cur) => acc + cur.amount, 0);

        allTotals[cat.id] = sum;
      }
      setUitgaven(allTotals);
    }
    fetchData();
  }, [categories]);

  function startEdit(cat: Categorie) {
    setEditId(cat.id);
    setFormData({
      naam: cat.naam,
      omschrijving: cat.omschrijving,
      max: cat.max.toString(),
      einddatum: cat.einddatum || "",
    });
  }

  function submitEdit(id: string) {
    if (onUpdate) {
      onUpdate(
        id,
        formData.naam,
        formData.omschrijving,
        parseFloat(formData.max),
        formData.einddatum || null
      );
    }
    setEditId(null);
  }

  return (
    <ul className="space-y-2">
      {categories.map((cat) => {
        const uitgegeven = uitgaven[cat.id] || 0;
        const ratio = uitgegeven / cat.max;
        const kleur =
          ratio >= 1
            ? "bg-red-900"
            : ratio >= 0.8
            ? "bg-orange-500"
            : "bg-green-500";

        return (
          <li key={cat.id} className={`border rounded p-2 ${kleur}`}>
            {editId === cat.id ? (
              <div className="space-y-1">
                <input
                  type="text"
                  value={formData.naam}
                  onChange={(e) =>
                    setFormData({ ...formData, naam: e.target.value })
                  }
                  className="border p-1 w-full"
                />
                <input
                  type="text"
                  value={formData.omschrijving}
                  onChange={(e) =>
                    setFormData({ ...formData, omschrijving: e.target.value })
                  }
                  className="border p-1 w-full"
                />
                <input
                  type="number"
                  value={formData.max}
                  onChange={(e) =>
                    setFormData({ ...formData, max: e.target.value })
                  }
                  className="border p-1 w-full"
                />
                <input
                  type="date"
                  value={formData.einddatum}
                  onChange={(e) =>
                    setFormData({ ...formData, einddatum: e.target.value })
                  }
                  className="border p-1 w-full"
                />
                <button
                  onClick={() => submitEdit(cat.id)}
                  className="text-green-600 hover:underline text-sm"
                >
                  Opslaan
                </button>
              </div>
            ) : (
              <>
                <div className="font-bold">{cat.naam}</div>
                <div className="text-sm text-gray-600">{cat.omschrijving}</div>
                <div className="text-sm text-gray-800">
                  Max: €{cat.max.toFixed(2)}
                </div>
                <div className="text-sm text-gray-800">
                  Uitgegeven: €{uitgegeven.toFixed(2)}
                </div>
                {cat.einddatum && (
                  <div className="text-sm text-gray-800">
                    Einddatum: {new Date(cat.einddatum).toLocaleDateString()}
                  </div>
                )}
                {(onUpdate || onDelete) && (
                  <div className="mt-2 space-x-2">
                    {onUpdate && (
                      <button
                        onClick={() => startEdit(cat)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Wijzig
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(cat.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Verwijder
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}
