import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const PlatformSelector = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const togglePlatform = (e: any) => {
    if (selectedPlatforms.includes(e.target.value)) {
      setSelectedPlatforms(
        selectedPlatforms.filter((p) => p !== e.target.value)
      );
    } else {
      setSelectedPlatforms([...selectedPlatforms, e.target.value]);
    }
  };

  return (
    <div className="mb-2">
      <ToggleButtonGroup
        color="primary"
        value={selectedPlatforms}
        exclusive
        onChange={togglePlatform}
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
