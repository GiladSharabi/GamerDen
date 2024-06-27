import {
  TextField,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { User, Gender } from "../../api/types";

type UserDetailsProps = {
  user: User;
  confirmPassword: string;
  onChange: (name: keyof User, value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  usernameError: string;
  emailError: string;
  discordError: string;
  passwordError: string;
  confirmPasswordError: string;
  genderError: string;
};

const UserDetails = ({
  user,
  confirmPassword,
  onChange,
  onConfirmPasswordChange,
  usernameError = "",
  emailError = "",
  discordError = "",
  passwordError = "",
  confirmPasswordError = "",
  genderError,
}: UserDetailsProps) => {

  const genderValues = Object.values(Gender);
  const filteredGenderValues = genderValues.filter(value => value !== Gender.None && value !== Gender.Both);

  return (
    <Box>
      <TextField
        error={!(usernameError === "")}
        helperText={usernameError}
        margin="normal"
        fullWidth
        label="Username"
        autoFocus
        value={user.username}
        onChange={(e) => onChange("username", e.target.value)}
      />
      <TextField
        error={!(emailError === "")}
        helperText={emailError}
        margin="normal"
        fullWidth
        label="Email Address"
        value={user.email}
        onChange={(e) => onChange("email", e.target.value)}
      />
      <TextField
        error={!(discordError === "")}
        helperText={discordError}
        margin="normal"
        fullWidth
        label="Discord"
        value={user.discord}
        onChange={(e) => onChange("discord", e.target.value)}
      />
      <TextField
        error={!(passwordError === "")}
        helperText={passwordError}
        margin="normal"
        fullWidth
        label="Password"
        value={user.password}
        onChange={(e) => onChange("password", e.target.value)}
      />
      <TextField
        error={!(confirmPasswordError === "")}
        helperText={confirmPasswordError}
        margin="normal"
        fullWidth
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => onConfirmPasswordChange(e.target.value)}
      />
      <FormControl component="fieldset" margin="normal">
        <Typography
          variant="subtitle1"
          gutterBottom
          color={genderError === "" ? "black" : "red"}
        >
          Gender
        </Typography>

        <RadioGroup
          sx={{ marginBottom: 2 }}
          value={user.gender}
          onChange={(e) => onChange("gender", e.target.value)}
        >
          {filteredGenderValues.map((gender: Gender) => <FormControlLabel
            value={gender}
            control={
              <Radio sx={{ color: genderError === "" ? "default" : "red" }} />
            }
            label={gender}
            sx={{
              color: genderError === "" ? "default" : "red",
            }}
          />)}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default UserDetails;
