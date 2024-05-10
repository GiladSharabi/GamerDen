import React, { useState, useEffect } from "react";

const AgeRangeSelector = () => {
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(70);
  const [minOptions, setMinOptions] = useState<number[]>([]);
  const [maxOptions, setMaxOptions] = useState<number[]>([]);

  useEffect(() => {
    const updateMinOptions = () => {
      const minOpts: number[] = [];
      for (let i = 18; i < maxAge; i++) {
        minOpts.push(i);
      }
      setMinOptions(minOpts);
    };

    const updateMaxOptions = () => {
      const maxOpts: number[] = [];
      for (let i = minAge + 1; i <= 70; i++) {
        maxOpts.push(i);
      }
      setMaxOptions(maxOpts);
    };

    updateMinOptions();
    updateMaxOptions();
  }, [minAge, maxAge]);

  const handleMinChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setMinAge(value);
    if (value >= maxAge) {
      setMaxAge(value + 1);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setMaxAge(value);
    if (value <= minAge) {
      setMinAge(value - 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <select value={minAge} onChange={handleMinChange}>
          {minOptions.map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
        <label>-</label>
        <select value={maxAge} onChange={handleMaxChange}>
          {maxOptions.map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AgeRangeSelector;
