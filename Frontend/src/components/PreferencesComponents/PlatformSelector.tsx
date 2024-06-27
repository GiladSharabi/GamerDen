import { Typography, ToggleButton, ToggleButtonGroup, Grid } from "@mui/material";
import { MouseEvent } from "react";
import { Platform } from "../../api/types";

type props = {
  label: string;
  selectedPlatforms: Platform[];
  onChange: (event: MouseEvent<HTMLElement>, newPlatform: Platform[]) => void;
};

const PlatformSelector = ({
  selectedPlatforms = [],
  onChange,
  label = "Select teammate Platform",
}: props) => {

  const platformValues = Object.values(Platform);

  return (
    <Grid className="mb-2">
      <Typography variant="h6" gutterBottom color="white">
        {label}
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={selectedPlatforms}
        exclusive={false}
        onChange={(event, newValue) => onChange(event, newValue)}
        aria-label="Platform"
      >
        {platformValues.map((platform) => (
          <ToggleButton key={platform} value={platform}>
            {platform}
          </ToggleButton>
        ))}

      </ToggleButtonGroup>
    </Grid>
  );
};
export default PlatformSelector;
