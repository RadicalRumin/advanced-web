import { Transaction } from "@/app/boekjes/[id]/page";

export const filterByMonth = (transactions: Transaction[], month: Date): Transaction[] => {
    return transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return (
            transactionDate.getMonth() === month.getMonth() &&
            transactionDate.getFullYear() === month.getFullYear()
        );
    });
};

export const sortByDate = (transactions: Transaction[]): Transaction[] => {
    return [...transactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
};
