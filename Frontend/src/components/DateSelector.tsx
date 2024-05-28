import { useState } from "react";

export type DateOfBirth = {
  day?: number;
  month?: number;
  year?: number;
};

type props = {
  onDateChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  errorMsg?: string;
};

const DateSelector = ({ onDateChange, errorMsg = "" }: props) => {
  const hundredYearsAgo = new Date().getFullYear() - 100;
  const days = [...Array(31).keys()].map((i) => i + 1);
  const months = [...Array(12).keys()].map((i) => i + 1);
  const years = [...Array(101).keys()].map((i) => hundredYearsAgo + i);

  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    if (id === "day") {
      setDay(parseInt(value));
    } else if (id === "month") {
      setMonth(parseInt(value));
    } else if (id === "year") {
      setYear(parseInt(value));
    }
    onDateChange(e);
  };

  return (
    <>
      <div className="flex gap-4 mb-3">
        {/* Day Select */}
        <select
          id="day"
          name="day"
          value={day}
          onChange={handleChange}
          className="border rounded p-2"
          // required
        >
          <option value={0}>Day</option>
          {days.map((day) => (
            <option key={day}>{day}</option>
          ))}
        </select>

        {/* Month Select */}
        <select
          id="month"
          name="month"
          value={month}
          onChange={handleChange}
          className="border rounded p-2"
          // required
        >
          <option value={0}>Month</option>
          {months.map((month) => (
            <option key={month}>{month}</option>
          ))}
        </select>

        {/* Year Select */}
        <select
          id="year"
          name="year"
          value={year}
          onChange={handleChange}
          className="border rounded p-2"
          // required
        >
          <option value={0}>Year</option>
          {years.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
      </div>
      <div>
        <p className="text-red-600 text-sm">{errorMsg}</p>
      </div>
    </>
  );
};

export default DateSelector;
