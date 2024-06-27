import { Slider, Box, Typography, ThemeProvider } from "@mui/material";
import { useState, useEffect } from "react";
import theme from "../Theme";

type Props = {
  useUserRange: boolean;
  min_age: number;
  max_age: number;
  onChange: (newRange: number[]) => void;
};

const ageRange = { minAge: 18, maxAge: 100 };

const AgeRangeSelector = ({
  useUserRange,
  min_age,
  max_age,
  onChange,
}: Props) => {
  const [currentRange, setCurrentRange] = useState<[number, number]>(
    useUserRange ? [min_age, max_age] : [ageRange.minAge, ageRange.maxAge]
  );

  useEffect(() => {
    if (useUserRange) {
      setCurrentRange([min_age, max_age]);
    } else {
      setCurrentRange([ageRange.minAge, ageRange.maxAge]);
    }
  }, [useUserRange, min_age, max_age]);

  const handleChange = (_event: Event, newValues: number | number[]) => {
    if (Array.isArray(newValues)) {
      setCurrentRange(newValues as [number, number]);
      onChange(newValues as [number, number]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Typography variant="h6" gutterBottom>
          What is the age range of your ideal teammates?
        </Typography>
        <Slider
          value={currentRange}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={ageRange.minAge}
          max={ageRange.maxAge}
          disableSwap
          sx={{ width: 400 }}
        />
      </Box>
    </ThemeProvider>
  );
};


export default AgeRangeSelector;
