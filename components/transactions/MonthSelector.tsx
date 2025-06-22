import React, { useEffect, useState } from 'react';

type MonthSelectorProps = {
    currentMonth: Date;
    setCurrentMonth: (date: Date) => void;
}

export default function MonthSelector ({currentMonth, setCurrentMonth} : MonthSelectorProps) {
    const [monthInputValue, setMonthInputValue] = useState(() => {
        const year = currentMonth.getFullYear();
        const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    });

    useEffect(() => {
        const year = currentMonth.getFullYear();
        const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
        setMonthInputValue(`${year}-${month}`);
    }, [currentMonth]);

    return (
        <div className="mb-6 flex items-center">
            <label className="mr-4 font-medium">Select Month:</label>
            <input
                type="month"
                value={monthInputValue}
                onChange={(e) => {
                    const value = e.target.value;
                    setMonthInputValue(value);

                    const [year, month] = value.split('-');
                    if (year && month) {
                        setCurrentMonth(new Date(parseInt(year), parseInt(month) - 1, 1));
                    }
                }}
                className="p-2 border rounded"
            />
            <button
                className="ml-2 px-3 py-2 rounded bg-blue-500 hover:bg-blue-600"
                onClick={() => setCurrentMonth(new Date())}
            >
                Current Month
            </button>
        </div>
    );
};
