import { Transaction } from '@/app/boekjes/[id]/page';
import { Category } from '@/lib/categories';
import { getAllUserTransactionsViaBoekjes } from '@/lib/uitgaven';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

type ExpensesBarChartProps = {
    categories: Category[];
};

export default function TotalBudgetChart({ categories }: ExpensesBarChartProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const transactions = await getAllUserTransactionsViaBoekjes(new Date());
                setTransactions(transactions);
            } catch (err) {
                setError('Failed to load transactions');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    function formatInput(transactions: Transaction[], categories: Category[]) {
        // Calculate total expenses per category
        const categoryExpenses: Record<string, number> = {};

        console.log(transactions);

        transactions.forEach(transaction => {
            if (transaction.type === 'expense') {
                const categoryId = transaction.category;
                categoryExpenses[categoryId] = (categoryExpenses[categoryId] || 0) + transaction.amount;
            }
        });

        // Prepare chart data
        return categories
            .filter(category => category.max !== undefined)
            .map(category => ({
                category: category.naam,
                budget: category.max! - (categoryExpenses[category.naam] || 0),
                max: category.max
            }));
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const chartData = formatInput(transactions, categories);

    return (
        <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip formatter={(value: number) => value.toFixed(2)} />
            <Legend />
            <Bar dataKey="budget" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
    );
}
