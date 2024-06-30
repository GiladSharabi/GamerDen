import { FormControlLabel, Checkbox, Box, Typography } from "@mui/material";

type props = {
  isUse: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const UsePreferencesSelector = ({ isUse = false, onChange }: props) => {
  return (
    <Box marginBottom={2} sx={{ width: "100%" }}>
      <FormControlLabel
        control={<Checkbox checked={isUse} onChange={onChange} />}
        label={
          <Typography color="textPrimary">Use My Gaming Preferences</Typography>
        }
      ></FormControlLabel>
    </Box>
  );
};

export default UsePreferencesSelector;
