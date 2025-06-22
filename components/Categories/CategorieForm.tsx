'use client';
import ItemForm from '../ItemForm';

interface CategorieFormProps {
  onSubmit: (naam: string, omschrijving: string) => void;
}

export default function CategorieForm({ onSubmit }: CategorieFormProps) {
  return (
    <ItemForm
      label="Categorie"
      onSubmit={onSubmit}
      submitLabel="Toevoegen"
    />
  );
}