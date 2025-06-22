import BoekjePageClient from './BoekjePageClient';

export type Transaction = {
    id?: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date: string;
};

type BoekjePageProps = {
    params: Promise<{ id: string }>;
};

export default async function BoekjePage({ params }: BoekjePageProps) {
    const { id } = await params
    return <BoekjePageClient id={id} />;
}