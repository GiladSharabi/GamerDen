import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { SoloOrGroup } from "../api/types";
type props = {
  label: string;
  soloOrGroup: SoloOrGroup;
  onChange: (choice: SoloOrGroup) => void;
};

const PlatformSelector = ({
  soloOrGroup = SoloOrGroup.None,
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
        value={soloOrGroup}
        exclusive
        onChange={(event, choice) => {
          if (choice !== null) {
            onChange(choice);
          }
        }}
        aria-label="SoloOrGroup"
      >
        <ToggleButton value={SoloOrGroup.Solo}>Solo</ToggleButton>
        <ToggleButton value={SoloOrGroup.Group}>Group</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
export default PlatformSelector;
