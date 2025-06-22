'use client';

import { useState } from 'react';

type Transaction = {
    id: number;
    date: string;
    description: string;
    amount: number;
};

function groupByMonth(transactions: Transaction[]) {
    return [...new Set(transactions.map(tx => tx.date.slice(0, 7)))].sort().reverse();
}

export default function TransactionOverview({ transactions }: { transactions: Transaction[] }) {
    const [selectedMonth, setSelectedMonth] = useState<string>(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    });

    const months = groupByMonth(transactions);

    const filtered = transactions
        .filter(tx => tx.date.startsWith(selectedMonth))
        .sort((a, b) => b.date.localeCompare(a.date));

    const income = filtered.filter(tx => tx.amount > 0).reduce((sum, tx) => sum + tx.amount, 0);
    const expenses = filtered.filter(tx => tx.amount < 0).reduce((sum, tx) => sum + tx.amount, 0);
    const balance = income + expenses;

    return (
        <>
            <label>
                Kies maand:&nbsp;
                <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
                    {months.map(month => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </label>

            <h2>Statistieken ({selectedMonth})</h2>
            <ul>
                <li>Inkomsten: €{income.toFixed(2)}</li>
                <li>Uitgaven: €{Math.abs(expenses).toFixed(2)}</li>
                <li>Balans: €{balance.toFixed(2)}</li>
            </ul>

            <h2>Transacties</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Omschrijving</th>
                        <th>Bedrag</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map(tx => (
                        <tr key={tx.id} >
                            <td>{tx.date}</td>
                            <td>{tx.description}</td>
                            <td style={{ textAlign: 'right' }}>
                                {tx.amount >= 0 ? '+' : '-'}€{Math.abs(tx.amount).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
