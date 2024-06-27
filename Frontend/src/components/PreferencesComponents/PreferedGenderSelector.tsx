import { Typography, ToggleButton, ToggleButtonGroup, Grid } from "@mui/material";
import { Gender } from "../../api/types";
type props = {
  selectedGender: Gender;
  onChange: (gender: Gender) => void;
};

const PreferedGenderSelector = ({
  selectedGender = Gender.None,
  onChange,
}: props) => {

  const genderValues = Object.values(Gender);
  const filteredGenderValues = genderValues.filter(value => value !== Gender.None);

  return (
    <Grid className="mb-2">
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
        {filteredGenderValues.map((gender) => <ToggleButton value={gender}>{gender}</ToggleButton>)}
      </ToggleButtonGroup>
    </Grid>
  );
};
export default PreferedGenderSelector;
