import React from 'react';

type MonthSelectorProps = {
    currentMonth: Date;
    setCurrentMonth: (date: Date) => void;
}

export default function MonthSelector ({currentMonth, setCurrentMonth} : MonthSelectorProps)
{
    return (
        <div className="mb-6 flex items-center">
            <label className="mr-4 font-medium">Select Month:</label>
            <input
                type="month"
                value={`${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`}
                onChange={(e) => {
                    const [year, month] = e.target.value.split('-');
                    setCurrentMonth(new Date(parseInt(year), parseInt(month) - 1, 1));
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
