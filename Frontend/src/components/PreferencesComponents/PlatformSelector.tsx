import { Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
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
  return (
    <div className="mb-2">
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
        <ToggleButton value={Platform.Playstation}>Playstation</ToggleButton>
        <ToggleButton value={Platform.Xbox}>Xbox</ToggleButton>
        <ToggleButton value={Platform.PC}>PC</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
export default PlatformSelector;
