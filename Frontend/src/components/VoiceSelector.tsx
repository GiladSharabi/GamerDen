import { FormControlLabel, Checkbox } from "@mui/material";
import Typography from "@mui/material/Typography";
type props = {
  isVoice: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const VoiceSelector = ({ isVoice, onChange }: props) => {
  return (
    <FormControlLabel
      control={<Checkbox checked={isVoice} onChange={onChange} />}
      label={<Typography color="textPrimary">Voice</Typography>}
    ></FormControlLabel>
  );
};

export default VoiceSelector;
