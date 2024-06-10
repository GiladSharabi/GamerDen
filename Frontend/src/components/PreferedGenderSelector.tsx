import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { Gender } from "../api/types";
type props = {
  label: string;
  selectedGender: Gender;
  onChange: (gender: Gender) => void;
};

const PreferedGenderSelector = ({
  selectedGender = Gender.None,
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
        value={selectedGender}
        exclusive
        onChange={(event, newGender) => {
          if (newGender !== null) {
            onChange(newGender);
          }
        }}
        aria-label="Platform"
      >
        <ToggleButton value={Gender.Male}>Male</ToggleButton>
        <ToggleButton value={Gender.Female}>Female</ToggleButton>
        <ToggleButton value={Gender.Both}>Both</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
export default PreferedGenderSelector;
