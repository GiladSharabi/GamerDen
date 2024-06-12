import { Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { MouseEvent } from "react";
import { Platform } from "../../api/types";
type props = {
  label: string;
  selectedPlatforms: Platform[];
  onChange: (event: MouseEvent<HTMLElement>, newPlatform: Platform) => void;
};

const PlatformSelector = ({
  selectedPlatforms = [],
  onChange,
  label = "",
}: props) => {
  return (
    <div className="mb-2">
      <Typography variant="h6" gutterBottom color="white">
        {label}
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={selectedPlatforms}
        exclusive
        onChange={onChange}
        aria-label="Platform"
      >
        <ToggleButton value="Playstation">Playstation</ToggleButton>
        <ToggleButton value="Xbox">Xbox</ToggleButton>
        <ToggleButton value="PC">PC</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
export default PlatformSelector;
