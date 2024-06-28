import { FormControlLabel, Checkbox, Box, Typography, ThemeProvider } from "@mui/material";
import theme from "../Theme";

type props = {
  isUse: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const UsePreferencesSelector = ({ isUse = false, onChange }: props) => {
  return (
    <ThemeProvider theme={theme}>
      <Box marginBottom={2} sx={{ width: "100%" }}>
        <FormControlLabel
          control={<Checkbox checked={isUse} onChange={onChange} />}
          label={
            <Typography color="textPrimary">Use My Gaming Preferences</Typography>
          }
        ></FormControlLabel>
      </Box>
    </ThemeProvider>
  );
};

export default UsePreferencesSelector;
