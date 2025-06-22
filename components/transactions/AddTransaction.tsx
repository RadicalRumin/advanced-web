import { Transaction } from "@/app/boekjes/[id]/page";
import { useState } from "react";



type AddTransactionProps =  {
    onSubmit: (transaction: Transaction) => void;
}
export default function AddTransaction({ onSubmit } : AddTransactionProps) {
    const [form, setForm] = useState<Omit<Transaction, 'id'>>({
        amount: 0,
        type: 'expense',
        category: '',
        date: new Date().toISOString().split('T')[0]
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit({
            ...form,
            amount: parseFloat(form.amount.toString())
        });
        // Reset form
        setForm({
            amount: 0,
            type: 'expense',
            category: '',
            date: new Date().toISOString().split('T')[0]
        });
    };



    return (
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Add Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select
                        name="type"
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value as 'income' | 'expense'})}
                        className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <input
                        type="text"
                        name="amount"
                        placeholder="Amount"
                        value={form.amount ?? ''}
                        onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) || 0})}
                        required
                        className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value})}
                        required
                        className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value})}
                        className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <button
                    type="submit"
                    className={`mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded dark:bg-blue-600 dark:hover:bg-blue-700`}
                >
                    Add Transaction
                </button>
            </form>
        </div>
    );
}