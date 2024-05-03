// DateSelector.tsx
import React from "react";

interface DateSelectorProps {
  day: string;
  month: string;
  year: string;
  onDayChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  day,
  month,
  year,
  onDayChange,
  onMonthChange,
  onYearChange,
}) => {
  const generateOptions = (start: number, end: number) => {
    const options = [];

    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return options;
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const options = [];

    for (let i = currentYear; i >= currentYear - 100; i--) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return options;
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {/* Day Select */}
      <select value={day} onChange={(e) => onDayChange(e.target.value)}>
        <option value="">Day</option>
        {generateOptions(1, 31)}
      </select>

      {/* Month Select */}
      <select value={month} onChange={(e) => onMonthChange(e.target.value)}>
        <option value="">Month</option>
        {generateOptions(1, 12)}
      </select>

      {/* Year Select */}
      <select value={year} onChange={(e) => onYearChange(e.target.value)}>
        <option value="">Year</option>
        {generateYearOptions()}
      </select>
    </div>
  );
};

export default DateSelector;
