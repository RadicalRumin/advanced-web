import { Transaction } from '@/lib/core/statistics';
import { filterByMonth, sortByDate } from '../lib/core/filters';

describe('Transaction Utility Functions', () => {
    const mockTransactions: Transaction[] = [
        {
            id: "0SRbJl2pGI5zPo6Re2Il",
            type: "expense",
            amount: 200,
            category: "test",
            date: "2023-02-01",
        },
        {
            id: "1aA2bB3cC4dD5eE6fF7g",
            type: "income",
            amount: 1000,
            category: "salary",
            date: "2023-02-01",
        },
        {
            id: "2bB3cC4dD5eE6fF7gG8h",
            type: "expense",
            amount: 150,
            category: "groceries",
            date: "2023-01-15",
        },
        {
            id: "3cC4dD5eE6fF7gG8hH9i",
            type: "income",
            amount: 200,
            category: "freelance",
            date: "2023-03-10",
        },
    ];

    describe('filterByMonth', () => {
        it('should filter transactions for a specific month and year', () => {
            const february2023 = new Date('2023-02-01');
            const result = filterByMonth(mockTransactions, february2023);

            expect(result).toHaveLength(2);
            expect(result.map(t => t.id)).toEqual([
                "0SRbJl2pGI5zPo6Re2Il",
                "1aA2bB3cC4dD5eE6fF7g"
            ]);
        });

        it('should return empty array if no transactions match the month', () => {
            const april2023 = new Date('2023-04-01');
            const result = filterByMonth(mockTransactions, april2023);

            expect(result).toHaveLength(0);
        });

        it('should handle empty transactions array', () => {
            const anyMonth = new Date('2023-01-01');
            const result = filterByMonth([], anyMonth);

            expect(result).toHaveLength(0);
        });
    });

    describe('sortByDate', () => {
        it('should sort transactions by date in descending order', () => {
            const result = sortByDate(mockTransactions);

            expect(result).toHaveLength(mockTransactions.length);
            expect(result.map(t => t.id)).toEqual([
                "3cC4dD5eE6fF7gG8hH9i", // March 10 (newest)
                "0SRbJl2pGI5zPo6Re2Il", // Feb 1
                "1aA2bB3cC4dD5eE6fF7g", // Feb 1
                "2bB3cC4dD5eE6fF7gG8h"  // Jan 15 (oldest)
            ]);
        });

        it('should not mutate the original array', () => {
            const originalCopy = [...mockTransactions];
            sortByDate(mockTransactions);

            expect(mockTransactions).toEqual(originalCopy);
        });

        it('should handle empty array', () => {
            const result = sortByDate([]);

            expect(result).toHaveLength(0);
        });

        it('should handle single transaction', () => {
            const singleTransaction = [mockTransactions[0]];
            const result = sortByDate(singleTransaction);

            expect(result).toHaveLength(1);
            expect(result[0].id).toBe("0SRbJl2pGI5zPo6Re2Il");
        });

        it('should correctly sort transactions with same date', () => {
            const transactionsWithSameDate: Transaction[] = [
                {
                    id: "a",
                    type: "expense",
                    amount: 100,
                    category: "test",
                    date: "2025-06-22",
                },
                {
                    id: "b",
                    type: "income",
                    amount: 200,
                    category: "salary",
                    date: "2025-06-20",
                },
                {
                    id: "c",
                    type: "expense",
                    amount: 300,
                    category: "groceries",
                    date: "2025-06-21",
                },
            ];

            const result = sortByDate(transactionsWithSameDate);

            expect(result.map(t => t.id)).toEqual(['a', 'c', 'b']);
        });
    });
});