'use client';
import CategorieForm from '@/components/Categories/CategorieForm';
import CategorieList from '@/components/Categories/CategorieList';
import TotalBudgetChart from '@/components/Categories/TotalBudgetChart';
import { addCategorie, deleteCategorie, subscribeToCategories, updateCategorie } from '@/lib/categories';
import { useEffect, useState } from 'react';
import { useUser } from '@/lib/auth';

interface Categorie {
  id: string;
  naam: string;
  omschrijving: string;
  eigenaarId: string;
  max: number;
  einddatum?: string;
}

export default function CategoriesPage() {
  const user = useUser();
  const [categories, setCategories] = useState<Categorie[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToCategories(setCategories);
    return () => unsubscribe();
  }, []);

  return (
    <main className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Categorieën beheren</h1>

      <TotalBudgetChart categories={categories} />

      <CategorieForm
        onSubmit={(naam, omschrijving, max, einddatum) => {
          if (!user) return;
          addCategorie(naam, omschrijving, user.uid, max, einddatum);
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