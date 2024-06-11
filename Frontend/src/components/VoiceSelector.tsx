import { FormControlLabel, Checkbox, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
type props = {
  isVoice: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const VoiceSelector = ({ isVoice, onChange }: props) => {
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
