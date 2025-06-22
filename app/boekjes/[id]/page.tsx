type BoekId = {
    id: string;
};

type BoekjePageProps = {
    params: Promise<BoekId>;
};


export default function BoekjePage({ params }: BoekjePageProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Financial Overview</h1>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg shadow">
                    <h3 className="font-semibold text-gray-800 dark:text-green-200">Income</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-green-50">€0.00</p>
                </div>
                <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg shadow">
                    <h3 className="font-semibold text-gray-800 dark:text-red-200">Expenses</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-red-50">€0.00</p>
                </div>
                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg shadow">
                    <h3 className="font-semibold text-gray-800 dark:text-blue-200">Balance</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-blue-50">€0.00</p>
                </div>
            </div>

            {/* Add Transaction Form */}
            <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Add Transaction</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Amount"
                        className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                    <input
                        type="date"
                        className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded dark:bg-blue-600 dark:hover:bg-blue-700">
                    Add Transaction
                </button>
            </div>

            {/* Month Selector */}
            <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-800 dark:text-white">Select Month:</label>
                <input
                    type="month"
                    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
            </div>

            {/* Transactions List */}
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
                            <tr className="border-b dark:border-gray-700">
                                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">2023-06-15</td>
                                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">Expense</td>
                                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">Groceries</td>
                                <td className="py-3 px-4 text-red-600 dark:text-red-400">-€85.50</td>
                                <td className="py-3 px-4">
                                    <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}