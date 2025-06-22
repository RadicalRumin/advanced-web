export const calculateBalance = (transactions: Transaction[]): number => {
    return transactions.reduce((sum, t) =>
        t.type === 'income' ? sum + t.amount : sum - t.amount, 0
    );
};

export const calculateTotals = (transactions: Transaction[]) => {
    return transactions.reduce((totals, t) => {
        return {
            income: totals.income + (t.type === 'income' ? t.amount : 0),
            expenses: totals.expenses + (t.type === 'expense' ? t.amount : 0)
        };
    }, { income: 0, expenses: 0 });
};

export type Transaction = {
    id?: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date: string;
  };