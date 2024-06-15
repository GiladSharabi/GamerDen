import { Slider, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

type props = {
  label: string;
  minAge: number;
  maxAge: number;
  ageRange: number[];
  onChange: (newValue: number[]) => void;
};

const AgeRangeSelector = ({
  label,
  minAge,
  maxAge,
  ageRange,
  onChange,
}: props) => {
  const [currentVal, setCurrentVal] = useState<number[]>(ageRange);

  useEffect(() => {
    ageRange = [...currentVal]; // Update currentVal if ageRange prop changes
    // onChange(ageRange);
  }, [currentVal]);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setCurrentVal(newValue);
    // if (activeThumb === 0) {
    //   setCurrentVal([Math.min(newValue[0], currentVal[1]), currentVal[1]]);
    // } else {
    //   setCurrentVal([currentVal[0], Math.max(newValue[1], currentVal[0])]);
    // }
    // ageRange = [...currentVal];
    // console.log("ageRange: " + ageRange);
  };

  const handleCommitChange = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => {
    // console.log(newValue);
    onChange(newValue as number[]);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="white">
        {label}
      </Typography>
      <Slider
        value={currentVal}
        onChange={handleChange}
        // onChangeCommitted={handleCommitChange}
        valueLabelDisplay="auto"
        min={minAge}
        max={maxAge}
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
