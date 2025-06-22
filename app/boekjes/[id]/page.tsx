import BoekjePageClient from './BoekjePageClient';

export type Transaction = {
    id?: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date: string;
};

type BoekjePageProps = {
    id: string;
};

export default function BoekjePage({ id }: BoekjePageProps) {
    console.log(id);
    return <BoekjePageClient id={id} />;
}