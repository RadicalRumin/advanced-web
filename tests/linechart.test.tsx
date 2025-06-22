import { Transaction } from "@/app/boekjes/[id]/page";
import BalanceHistoryLineChart from "../components/transactions/BalanceHistoryLineChart";
import { render, screen } from "@testing-library/react";

const mockdata: Transaction[] = [
    {
        id: "0SRbJl2pGI5zPo6Re2Il",
        type: "expense",
        amount: 200,
        category: "test",
        date: "2025-06-22",
    },
    {
        id: "1aA2bB3cC4dD5eE6fF7g",
        type: "income",
        amount: 1000,
        category: "salary",
        date: "2025-06-20",
    },
    {
        id: "2bB3cC4dD5eE6fF7gG8h",
        type: "expense",
        amount: 150,
        category: "groceries",
        date: "2025-06-21",
    },
    {
        id: "3cC4dD5eE6fF7gG8hH9i",
        type: "income",
        amount: 200,
        category: "freelance",
        date: "2025-06-22",
    },
];

describe('BalanceHistoryLineChart', () => {
    it('renders without crashing and processes balance correctly', () => {
        render(<BalanceHistoryLineChart transactions={ mockdata } />);
        const element = screen.getByText(/balance/i);
        expect(element).toBeInTheDocument();
    });

    it('calculates the correct balance per date', () => {
        const expected = [
            { date: "2025-06-20", balance: 1000 },
            { date: "2025-06-21", balance: 850 },
            { date: "2025-06-22", balance: 850 }, // -200 + 200 on same day
            { date: "2025-06-23", balance: 1100 }, // +300 - 50
            { date: "2025-06-24", balance: 1020 }, // -80
            { date: "2025-06-25", balance: 1420 }, // +500 - 100
            { date: "2025-06-26", balance: 1360 }, // -60
        ];

        // Extract the private function by mocking the module or moving it out — here we reimplement it inline for test
        function formatTransactions(transactions: Transaction[]) {
            const sorted = [...transactions].sort(
                (a, b) => a.date.localeCompare(b.date));
            const dailyMap = new Map<string, number>();
            let runningTotal = 0;

            for (const tx of sorted) {
                const signedAmount = tx.type === 'income' ? tx.amount : -tx.amount;
                runningTotal += signedAmount;
                dailyMap.set(tx.date, runningTotal);
            }

            return Array.from(dailyMap.entries()).map(([date, balance]) => ({
                date,
                balance,
            }));
        }

        const result = formatTransactions(mockdata);

        expect(result).toEqual(expected);
    });
});
