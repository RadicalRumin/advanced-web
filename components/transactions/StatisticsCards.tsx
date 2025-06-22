
type StatsCardsProps = {
    income: number;
    expenses: number;
    balance: number;
}

export default function StatisticsCards({income, expenses, balance} : StatsCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 dark:text-green-200">Income</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-green-50">${income.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 dark:text-red-200">Expenses</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-red-50">${expenses.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 dark:text-blue-200">Balance</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-blue-50">€{balance.toFixed(2)}</p>
            </div>
        </div>
    );
}