import TransactionOverview from "@/components/TransactionOverview";

type BoekId = {
    id: string;
};

type BoekjePageProps = {
    params: Promise<BoekId>;
};

type Transaction = {
    id: number;
    date: string;
    description: string;
    amount: number;
};

// Simulate server-side fetch
async function getTransactions(): Promise<Transaction[]> {
    return [
        { id: 1, date: '2025-06-15', description: 'Salaris', amount: 2500 },
        { id: 2, date: '2025-06-17', description: 'Boodschappen', amount: -150 },
        { id: 3, date: '2025-05-30', description: 'Huur', amount: -800 },
        { id: 4, date: '2025-05-05', description: 'Freelance opdracht', amount: 700 },
        { id: 5, date: '2025-06-01', description: 'Gym', amount: -30 },
    ];
}

export default async function BoekjePage({ params }: BoekjePageProps) {
    const transactions = await getTransactions();
    return (
        <div >
            <h1>Financieel Overzicht</h1>
            <TransactionOverview transactions={transactions} />
        </div>
    );


}