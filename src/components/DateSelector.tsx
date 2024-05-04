import { useState } from "react";

const DateSelector = () => {
  const days = [...Array(31).keys()].map((i) => i + 1);
  const months = [...Array(12).keys()].map((i) => i + 1);
  const years = [...Array(101).keys()].map((i) => 1924 + i);

  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  return (
    <div className="flex gap-4">
      {/* Day Select */}
      <select
        value={day}
        onChange={(e) => setDay(parseInt(e.target.value))}
        className="border rounded p-2"
      >
        <option value="">Day</option>
        {days.map((day) => (
          <option key={day}>{day}</option>
        ))}
      </select>

      {/* Month Select */}
      <select
        value={month}
        onChange={(e) => setMonth(parseInt(e.target.value))}
        className="border rounded p-2"
      >
        <option value="">Month</option>
        {months.map((month) => (
          <option key={month}>{month}</option>
        ))}
      </select>

      {/* Year Select */}
      <select
        value={year}
        onChange={(e) => setYear(parseInt(e.target.value))}
        className="border rounded p-2"
      >
        <option value="">Year</option>
        {years.map((year) => (
          <option key={year}>{year}</option>
        ))}
      </select>
    </div>
  );
};

export default DateSelector;
