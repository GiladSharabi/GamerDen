import { Slider, Box, Typography } from "@mui/material";
import { useState } from "react";

type Props = {
  min_age: number;
  max_age: number;
  onChange: (newRange: number[]) => void;
};

const AgeRangeSelector = ({ min_age, max_age, onChange }: Props) => {
  const [currentRange, setCurrentRange] = useState<[number, number]>([min_age, max_age]);

  const handleChange = (_event: Event, newValues: number | number[]) => {
    if (Array.isArray(newValues)) {
      setCurrentRange(newValues as [number, number]);
      onChange(newValues as [number, number]);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="white">
        Between what ages are your ideal teammates?
      </Typography>
      <Slider
        value={currentRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={18}
        max={100}
        disableSwap
        sx={{
          width: 400,
          "& .MuiSlider-thumb": {
            borderRadius: "10px",
            width: "6px",
          },
        }}
      />
    </Box>
  );
};

export default AgeRangeSelector;
