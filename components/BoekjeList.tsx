"use client";
import Link from "next/link";
import { useState } from "react";

export default function BoekjeList({
  boekjes,
  onArchive,
  onUpdate,
  archiveMode,
}: {
  boekjes: any[];
  onArchive: (id: string) => void;
  onUpdate?: (id: string, naam: string, omschrijving: string) => void;
  archiveMode?: boolean;
}) {
  const [editId, setEditId] = useState<string | null>(null);
  const [editNaam, setEditNaam] = useState("");
  const [editOmschrijving, setEditOmschrijving] = useState("");
  const [foutmelding, setFoutmelding] = useState("");

  const startEdit = (b: any) => {
    setEditId(b.id);
    setEditNaam(b.naam);
    setEditOmschrijving(b.omschrijving);
    setFoutmelding("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditNaam("");
    setEditOmschrijving("");
    setFoutmelding("");
  };

  const saveEdit = (id: string) => {
    if (editNaam.trim().length < 3) {
      setFoutmelding("De naam moet minstens 3 karakters bevatten.");
      return;
    }
    if (onUpdate) onUpdate(id, editNaam, editOmschrijving);
    cancelEdit();
  };

  return (
    <div>
      {!archiveMode && (
        <Link
          href="/archief"
          className="text-sm text-gray-500 underline inline-block mb-4"
        >
          Bekijk gearchiveerde boekjes
        </Link>
      )}
      <ul className="space-y-2">
        {boekjes.map((b) => (
          <li key={b.id} className="border p-4 rounded flex flex-col gap-2">
            {editId === b.id ? (
              <div className="space-y-2">
                <input
                  value={editNaam}
                  onChange={(e) => setEditNaam(e.target.value)}
                  className="border p-2 w-full"
                />
                <input
                  value={editOmschrijving}
                  onChange={(e) => setEditOmschrijving(e.target.value)}
                  className="border p-2 w-full"
                />
                {foutmelding && (
                  <p className="text-red-600 text-sm">{foutmelding}</p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(b.id)}
                    className="bg-green-600 text-white p-2"
                  >
                    Opslaan
                  </button>
                  <button onClick={cancelEdit} className="bg-gray-300 p-2">
                    Annuleren
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  {!archiveMode ? (
                    <Link
                      href={`/boekjes/${b.id}`}
                      className="font-semibold hover:underline"
                    >
                      {b.naam}
                    </Link>
                  ) : (
                    <p className="font-semibold">{b.naam}</p>
                  )}
                  <p className="text-sm text-gray-600">{b.omschrijving}</p>
                </div>
                <div className="flex gap-2">
                  {!archiveMode && (
                    <>
                      <button
                        onClick={() => startEdit(b)}
                        className="text-sm text-blue-600"
                      >
                        Wijzig
                      </button>
                      <button
                        onClick={() => onArchive(b.id)}
                        className="text-sm text-red-600"
                      >
                        Archiveer
                      </button>
                    </>
                  )}
                  {archiveMode && (
                    <button
                      onClick={() => onArchive(b.id)}
                      className="text-sm text-green-600"
                    >
                      Herstel
                    </button>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
