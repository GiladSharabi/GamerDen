import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

type CountrySelectorProps = {
    country: string;
    onChange: (value: string) => void;
};

const CountrySelector = ({ country, onChange }: CountrySelectorProps) => {
    const countries = ['Country 1', 'Country 2', 'Country 3']; // Replace with actual country list

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
