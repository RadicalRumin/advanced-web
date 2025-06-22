import { Transaction } from '@/app/boekjes/[id]/page';
import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';

type BalanceHistoryLineChartProps = {
    transactions : Transaction[]
}

export default function BalanceHistoryLineChart({ transactions } : BalanceHistoryLineChartProps ) {

    const data = formatTransactions(transactions);

    return (
        <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="balance" stroke="#82ca9d" />
        </LineChart>
    );
}

function formatTransactions(transactions: Transaction[]) {
    if(transactions.length <= 0) {
        return [];
    }

    const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));

    const dailyMap = new Map<string, number>();
    let runningTotal = 0;

    for (const tx of sorted) {
        const signedAmount = tx.type === 'income' ? tx.amount : -tx.amount;
        runningTotal += signedAmount;

        // Overwrite or set current balance for the day
        dailyMap.set(tx.date, runningTotal);
    }

    const result = Array.from(dailyMap.entries())
        .map(([date, balance]) => ({
            date, balance
        }));
    return result;
}