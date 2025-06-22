'use client';

import AddTransaction from "@/components/transactions/AddTransaction";
import MonthSelector from "@/components/transactions/MonthSelector";
import StatisticsCards from "@/components/transactions/StatisticsCards";
import TransactionList from "@/components/transactions/TransactionList";
import { calculateBalance, calculateTotals } from "@/lib/core/statistics";
import { addTransaction, deleteTransaction, getTransactions } from "@/lib/uitgaven";
import { useEffect, useState } from "react";
import { Transaction } from "./page";



type BoekjePageProps = {
    id: string;
};

export default function BoekjePageClient({ id }: BoekjePageProps) {
    console.log(id);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            setIsLoading(true);
            try {
                const data = await getTransactions(id, currentMonth);
                setTransactions(data);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, [ currentMonth]);

    const { income, expenses } = calculateTotals(transactions);
    const balance = calculateBalance(transactions);

    async function handleAddTransaction(transaction : Transaction) {


        try {
            const newTransaction = await addTransaction(id, transaction);
            setTransactions(prev => [...prev, newTransaction]);
        } catch (error) {
            console.error('Failed to add transaction:', error);
        }
    }

    async function handleDeleteTransaction(transactionId: string) {
        try {
            await deleteTransaction(id, transactionId);
            setTransactions(prev => prev.filter(t => t.id !== transactionId));
        } catch (error) {
            console.error('Failed to delete transaction:', error);
        }
    }


    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Financial Overview</h1>

            <StatisticsCards
                income={income}
                expenses={expenses}
                balance={balance}
            />

            <AddTransaction onSubmit={handleAddTransaction} />

            <MonthSelector
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
            />

            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <p>Loading transactions...</p>
                </div>
            ) : (
                <TransactionList
                    transactions={transactions}
                    onDelete={handleDeleteTransaction}
                />
            )}
        </div>
    );
}