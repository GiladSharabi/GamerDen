import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import regionsData from "../../regions.json";

type props = {
  label: string;
  region: string;
  onChange: (region: string) => void;
};

const RegionSelector = ({ label, region, onChange }: props) => {
  const [regionsList, setRegionsList] = useState<string[]>([]);
  useEffect(() => {
    setRegionsList(regionsData.regions);
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <Typography variant="h6" gutterBottom color="white">
        {label}
      </Typography>
      <FormControl>
        <InputLabel id="region-selector-label">Region</InputLabel>
        <Select
          sx={{ minWidth: "170px" }}
          labelId="region-selector-label"
          id="region-selector"
          value={region}
          label="Region"
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          {regionsList.map((region) => (
            <MenuItem key={region} value={region}>
              {region}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default RegionSelector;
