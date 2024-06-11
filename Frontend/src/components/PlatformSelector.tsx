import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { MouseEvent } from "react";
import { Platform } from "../api/types";
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
