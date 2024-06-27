import { FormControlLabel, Checkbox, Box, Typography } from "@mui/material";

type props = {
  isVoice: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const VoiceSelector = ({ isVoice = false, onChange }: props) => {
  return (
    <Box marginBottom={2} sx={{ width: "100%" }}>
      <FormControlLabel
        control={<Checkbox checked={isVoice} onChange={onChange} />}
        label={<Typography color="textPrimary">Voice</Typography>}
      ></FormControlLabel>
    </Box>
  );
};

export default VoiceSelector;
