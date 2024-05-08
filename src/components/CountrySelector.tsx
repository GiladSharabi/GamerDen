import { useEffect, useState } from "react";
import countriesData from "../countries.json";

const CountrySelector = () => {
  const [country, setCountry] = useState("");
  const [countriesList, setCountriesList] = useState<string[]>([]);
  useEffect(() => {
    setCountriesList(countriesData.countries);
  }, []);

  return (
    <div>
      <select
        value={country}
        className="rounded"
        onChange={(e) => setCountry(e.target.value)}
        required
      >
        <option value="">Select Country</option>
        {countriesList.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
