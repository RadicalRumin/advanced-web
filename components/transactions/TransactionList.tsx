import { Transaction } from "@/app/boekjes/[id]/page";

type TransactionListProps = {
    transactions: Transaction[];
    onDelete: (id: string) => void;
}

export default function TransactionList({ transactions, onDelete } : TransactionListProps){

    if (transactions.length === 0) {
        return (
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Transactions</h2>
                <p className="text-gray-500">No transactions found for this month.</p>
            </div>
        );
    }

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Transactions</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th className="py-3 px-4 text-left text-gray-800 dark:text-gray-200">Date</th>
                            <th className="py-3 px-4 text-left text-gray-800 dark:text-gray-200">Type</th>
                            <th className="py-3 px-4 text-left text-gray-800 dark:text-gray-200">Category</th>
                            <th className="py-3 px-4 text-left text-gray-800 dark:text-gray-200">Amount</th>
                            <th className="py-3 px-4 text-left text-gray-800 dark:text-gray-200">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{new Date(transaction.date).toLocaleDateString()}</td>
                                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{transaction.type}</td>
                                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{transaction.category}</td>
                                <td className={`py-3 px-4 font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {transaction.type === 'income' ? '+' : '-'}€{transaction.amount.toFixed(2)}
                                </td>
                                <td className="py-3 px-4">
                                    <button
                                        onClick={() => onDelete(transaction.id ?? "shit")}
                                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
