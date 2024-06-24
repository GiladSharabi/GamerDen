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
  return (
    <Box>
      <TextField
        error={!(usernameError === "")}
        helperText={usernameError}
        margin="normal"
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        value={user.username}
        onChange={(e) => onChange("username", e.target.value)}
      />
      <TextField
        error={!(emailError === "")}
        helperText={emailError}
        margin="normal"
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={user.email}
        onChange={(e) => onChange("email", e.target.value)}
      />
      <TextField
        error={!(discordError === "")}
        helperText={discordError}
        margin="normal"
        fullWidth
        id="discord"
        label="Discord"
        name="discord"
        autoComplete="discord"
        value={user.discord}
        onChange={(e) => onChange("discord", e.target.value)}
      />
      <TextField
        error={!(passwordError === "")}
        helperText={passwordError}
        margin="normal"
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
        value={user.password}
        onChange={(e) => onChange("password", e.target.value)}
      />
      <TextField
        error={!(confirmPasswordError === "")}
        helperText={confirmPasswordError}
        margin="normal"
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        autoComplete="new-password"
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
          aria-label="gender"
          name="gender"
          value={user.gender}
          onChange={(e) => onChange("gender", e.target.value)}
        >
          <FormControlLabel
            value={Gender.Male}
            control={
              <Radio sx={{ color: genderError === "" ? "default" : "red" }} />
            }
            label="Male"
            sx={{
              color: genderError === "" ? "default" : "red",
            }}
          />
          <FormControlLabel
            value={Gender.Female}
            control={
              <Radio sx={{ color: genderError === "" ? "default" : "red" }} />
            }
            label="Female"
            sx={{
              color: genderError === "" ? "default" : "red",
            }}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default UserDetails;
