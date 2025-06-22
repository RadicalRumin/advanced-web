'use client';
import ItemList from '../ItemList';

interface Categorie {
  id: string;
  naam: string;
  omschrijving: string;
}

interface CategorieListProps {
  categorieën: Categorie[];
  onUpdate?: (id: string, naam: string, omschrijving: string) => void;
  onDelete?: (id: string) => void;
}

export default function CategorieList({ categorieën, onUpdate, onDelete }: CategorieListProps) {
  return (
    <ItemList
      items={categorieën}
      onEdit={onUpdate}
      onDelete={onDelete}
      titleProp="naam"
      descriptionProp="omschrijving"
    />
  );
}
