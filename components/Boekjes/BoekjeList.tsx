'use client';
import ItemList from '../ItemList';

interface Boekje {
  id: string;
  naam: string;
  omschrijving: string;
}

interface BoekjeListProps {
  boekjes: Boekje[];
  onUpdate?: (id: string, naam: string, omschrijving: string) => void;
  onArchive?: (id: string) => void;
  archiveMode?: boolean;
}

export default function BoekjeList({ boekjes, onUpdate, onArchive, archiveMode = false }: BoekjeListProps) {
  return (
    <ItemList
      items={boekjes}
      onEdit={onUpdate}
      onArchive={!archiveMode ? onArchive : undefined}
      titleProp="naam"
      descriptionProp="omschrijving"
    />
  );
}
