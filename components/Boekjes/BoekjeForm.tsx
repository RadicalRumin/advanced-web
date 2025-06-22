'use client';
import ItemForm from '../ItemForm';

interface BoekjeFormProps {
  onSubmit: (naam: string, omschrijving: string) => void;
}

export default function BoekjeForm({ onSubmit }: BoekjeFormProps) {
  return (
    <ItemForm
      label="Boekje"
      onSubmit={onSubmit}
      submitLabel="Toevoegen"
    />
  );
}