import { Transaction } from '@/app/boekjes/[id]/page';
import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

type ExpensesBarChartProps = {
    transactions: Transaction[];
};

export default function ExpensesBarChart({ transactions }: ExpensesBarChartProps) {

    // Format transactions to aggregated expense sums per category
    const data = formatTransactions(transactions);

    return (
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => value.toFixed(2)} />
            <Legend />
            <Bar dataKey="expenses" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
    );
}

function formatTransactions(transactions: Transaction[]) {
    if (transactions.length <= 0) {
        return [];
    }

    const expenses = transactions.filter(t => t.type === "expense");

    const sumsByCategory: Record<string, number> = {};
    expenses.forEach(({ category, amount }) => {
        sumsByCategory[category] = (sumsByCategory[category] || 0) + amount;
    });

    return Object.entries(sumsByCategory).map(([category, total]) => ({
        name: category,
        expenses: total,
    }));
}
