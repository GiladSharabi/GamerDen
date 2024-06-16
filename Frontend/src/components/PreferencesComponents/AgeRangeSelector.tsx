import { Slider, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

type props = {
  label: string;
  minAge: number;
  maxAge: number;
  age_range: number[];
  onChange: (newValue: number[]) => void;
};

const age_rangeSelector = ({
  label,
  minAge,
  maxAge,
  age_range,
  onChange,
}: props) => {
  const [currentVal, setCurrentVal] = useState<number[]>(age_range);

  useEffect(() => {
    age_range = [...currentVal]; // Update currentVal if age_range prop changes
    // onChange(age_range);
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
    // age_range = [...currentVal];
    // console.log("age_range: " + age_range);
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

export default age_rangeSelector;
