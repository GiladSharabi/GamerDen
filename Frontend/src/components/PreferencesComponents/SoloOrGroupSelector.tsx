import { Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { SoloOrGroup } from "../../api/types";
import React from "react";

type PlatformSelectorProps = {
  label: string;
  soloOrGroup: SoloOrGroup;
  onChange: (choice: SoloOrGroup) => void;
};

const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  label = "",
  soloOrGroup = SoloOrGroup.None,
  onChange,
}: PlatformSelectorProps) => {
  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    choice: SoloOrGroup | null
  ) => {
    if (choice !== null) {
      onChange(choice);
    }
  };

  return (
    <div className="mb-2">
      <Typography variant="h6" gutterBottom color="white">
        {label}
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={soloOrGroup}
        exclusive
        onChange={handleToggleChange}
        aria-label="SoloOrGroup"
      >
        <ToggleButton value={SoloOrGroup.Solo}>Solo</ToggleButton>
        <ToggleButton value={SoloOrGroup.Group}>Group</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default PlatformSelector;
