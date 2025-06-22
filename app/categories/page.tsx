'use client';
import CategorieForm from '@/components/Categories/CategorieForm';
import CategorieList from '@/components/Categories/CategorieList';
import { addCategorie, deleteCategorie, subscribeToCategorieen, updateCategorie } from '@/lib/categories';
import { useEffect, useState } from 'react';

interface Categorie {
  id: string;
  naam: string;
  omschrijving: string;
}

export default function CategorieenPage() {
  const [categorieen, setCategorieen] = useState<Categorie[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToCategorieen(setCategorieen);
    return () => unsubscribe();
  }, []);

  return (
    <main className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Categorieën beheren</h1>
      <CategorieForm onSubmit={addCategorie} />
      <CategorieList
        categorieën={categorieen}
        onUpdate={updateCategorie}
        onDelete={deleteCategorie}
      />
    </main>
  );
}
