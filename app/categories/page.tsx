'use client';
import CategorieForm from '@/components/Categories/CategorieForm';
import CategorieList from '@/components/Categories/CategorieList';
import { addCategorie, deleteCategorie, subscribeToCategories, updateCategorie } from '@/lib/categories';
import { useEffect, useState } from 'react';

interface Categorie {
  id: string;
  naam: string;
  omschrijving: string;
  max?: number;
  einddatum?: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Categorie[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToCategories(setCategories);
    return () => unsubscribe();
  }, []);

  return (
    <main className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Categorieën beheren</h1>
      <CategorieForm
        onSubmit={(naam, omschrijving, max, einddatum) => {
          addCategorie(naam, omschrijving, max, einddatum);
        }}
      />
      <CategorieList
        categories={categories}
        onUpdate={updateCategorie}
        onDelete={deleteCategorie}
      />
    </main>
  );
}