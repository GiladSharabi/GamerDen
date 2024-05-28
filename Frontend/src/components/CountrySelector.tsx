import { useEffect, useState } from "react";
import countriesData from "../countries.json";

type props = {
  onCountryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  errorMsg?: string;
};

const CountrySelector = ({ onCountryChange, errorMsg = "" }: props) => {
  const [country, setCountry] = useState("");
  const [countriesList, setCountriesList] = useState<string[]>([]);
  useEffect(() => {
    setCountriesList(countriesData.countries);
  }, []);

  const handleChange = (e: any) => {
    setCountry(e.target.value);
    onCountryChange(e);
  };

  return (
    <>
      <div>
        <select
          id="country"
          name="country"
          value={country}
          className="rounded mb-3"
          onChange={handleChange}
          // required
        >
          <option value="">Select Country</option>
          {countriesList.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <div>
          <p className="text-red-600 text-sm">{errorMsg}</p>
        </div>
      </div>
    </>
  );
};

export default CountrySelector;
