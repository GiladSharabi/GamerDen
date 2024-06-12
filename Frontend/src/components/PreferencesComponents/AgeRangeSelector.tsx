import { Slider, Box, Typography } from "@mui/material";

type props = {
  label: string;
  minAge: number;
  maxAge: number;
  onChange: (event: Event, newValue: number | number[]) => void;
};

const AgeRangeSelector = ({
  minAge = 18,
  maxAge = 90,
  onChange,
  label,
}: props) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom color="white">
        {label}
      </Typography>
      <Slider
        value={[minAge, maxAge]}
        onChange={onChange}
        valueLabelDisplay="auto"
        min={18}
        max={90}
        disableSwap
        sx={{
          width: 300,
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
