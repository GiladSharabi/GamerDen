import { Typography, ToggleButton, ToggleButtonGroup, Grid } from "@mui/material";
import { Gender } from "../../api/types";
import theme from "../Theme";
type props = {
  selectedGender: Gender;
  onChange: (gender: Gender) => void;
};

const PreferredGenderSelector = ({
  selectedGender = Gender.None,
  onChange,
}: props) => {

  const genderValues = Object.values(Gender);
  const filteredGenderValues = genderValues.filter(value => value !== Gender.None);

  return (
    <Grid className="mb-2">
      <Typography gutterBottom >
        Which gender do you prefer to play with?
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={selectedGender}
        exclusive
        fullWidth
        onChange={(event, newGender) => { onChange(newGender) }}
      >
        {filteredGenderValues.map((gender, i) =>
          <ToggleButton
            key={i}
            value={gender}
            sx={{
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main,
                color: '#fff',
              },
            }}
          >
            {gender}
          </ToggleButton>)}
      </ToggleButtonGroup>
    </Grid>
  );
};
export default PreferredGenderSelector;
