// src/components/RegionSelector.tsx

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Region } from "../../api/types";

type Props = {
  region: Region;
  onChange: (region: Region) => void;
};

const RegionSelector = ({ region, onChange }: Props) => {
  const [regionsList, setRegionsList] = useState<Region[]>([]);

  useEffect(() => {
    const regions = Object.values(Region);
    setRegionsList(regions);
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <Typography variant="h6" gutterBottom color="white">
        Select Region
      </Typography>
      <FormControl>
        <InputLabel id="region-selector-label">Region</InputLabel>
        {regionsList.length > 0 ? (
          <Select
            sx={{ minWidth: "170px" }}
            labelId="region-selector-label"
            id="region-selector"
            value={region}
            label="Region"
            onChange={(event) => {
              onChange(event.target.value as Region);
            }}
          >
            {/* <MenuItem value="">
              <em>Select Region</em>
            </MenuItem> */}
            {regionsList.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Typography>Loading regions...</Typography>
        )}
      </FormControl>
    </Box>
  );
};

export default RegionSelector;
