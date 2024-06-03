import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { countries as CountriesListing } from "../../countries.json";
import { useEffect, useState } from "react";
type CountrySelectorProps = {
  country: string;
  onChange: (value: string) => void;
};

const CountrySelector = ({ country, onChange }: CountrySelectorProps) => {
  const [countries, setCountries] = useState<string[]>([]);
  useEffect(() => {
    setCountries(CountriesListing);
  }, []);

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="country-label">Country</InputLabel>
      <Select
        labelId="country-label"
        id="country"
        value={country}
        onChange={(e) => onChange(e.target.value)}
      >
        {countries.map((country, index) => (
          <MenuItem key={index} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountrySelector;
