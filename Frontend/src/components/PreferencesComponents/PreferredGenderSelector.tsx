import { Typography, ToggleButton, ToggleButtonGroup, Grid, ThemeProvider } from "@mui/material";
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
    <ThemeProvider theme={theme}>
      <Grid className="mb-2">
        <Typography variant="h6" gutterBottom >
          Which gender do you prefer to play with?
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={selectedGender}
          exclusive
          onChange={(event, newGender) => { onChange(newGender) }}
        >
          {filteredGenderValues.map((gender, i) => <ToggleButton key={i} value={gender}>{gender}</ToggleButton>)}
        </ToggleButtonGroup>
      </Grid>
    </ThemeProvider>
  );
};
export default PreferredGenderSelector;
