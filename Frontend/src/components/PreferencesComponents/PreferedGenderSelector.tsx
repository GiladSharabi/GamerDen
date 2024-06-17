import { Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Gender } from "../../api/types";
type props = {
  selectedGender: Gender;
  onChange: (gender: Gender) => void;
};

const PreferedGenderSelector = ({
  selectedGender = Gender.None,
  onChange,
}: props) => {
  return (
    <div className="mb-2">
      <Typography variant="h6" gutterBottom color="white">
        Which gender do you prefer to play with?
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
