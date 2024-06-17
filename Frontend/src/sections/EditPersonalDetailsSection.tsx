import {
  Avatar,
  Box,
  Grid,
  Typography,
  Button,
  ThemeProvider,
  FormControl,
  RadioGroup,
  Radio,
  TextField,
  FormControlLabel,
} from "@mui/material";
import theme from "../components/Theme";
import { useState, useEffect } from "react";
import { User } from "../api/types";
import { Person } from "@mui/icons-material";
import MyDivider from "../components/MyDivider";
import { Gender } from "../api/types";
import DatePickerComponent from "../components/SignUpComponents/DatePickerComponent";
import CountrySelector from "../components/SignUpComponents/CountrySelector";
import LanguageSelector from "../components/SignUpComponents/LanguagesSelector";
import BioTextarea from "../components/SignUpComponents/BioTextarea";

type Props = {
  user: User;
  buttonLabel: string;
  onSaveClick: (updatedUser: User) => void;
};

const EditPersonalDetailsSection = ({
  user,
  buttonLabel,
  onSaveClick,
}: Props) => {
  const [tempUser, setTempUser] = useState<User>(user);

  const [hasError, setHasError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const today = new Date();

  const handleUserChange = (name: keyof User, value: string) => {
    // console.log("name: " + name + " value: " + value);
    setTempUser({ ...tempUser, [name]: value });
  };

  // const handleCountryChange = (value: string) => {
  //   setTempUser({ ...tempUser, country: value });
  // };

  const handleLanguageChange = (languages: string[]) => {
    setTempUser({ ...tempUser, languages });
  };

  const handleDateChange = (date: Date | null) => {
    setTempUser({ ...tempUser, dob: date || new Date() });
  };

  const handleCountryChange = (value: string) => {
    setTempUser({ ...tempUser, country: value });
  };

  const handleBioChange = (value: string) => {
    setTempUser({ ...tempUser, bio: value });
  };
  const handleSubmit = async () => {
    if (!tempUser.username) {
      setUsernameError("Please enter Username.");
    } else {
      setUsernameError("");
    }
    if (!tempUser.email) {
      setEmailError("Please enter Email.");
    } else {
      setEmailError("");
    }
    try {
      setHasError(false);
    } catch (e) {
      console.log("Error in update personal details " + e);
    }
  };

  const handleSaveClick = () => {
    onSaveClick(tempUser);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container className="flex justify-center mt-10 ">
        {/* the box that contains all the elements */}
        <Box
          bgcolor="background.default"
          p={2}
          borderRadius={4}
          display="flex"
          flexDirection="column"
          marginBottom={10}
        >
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar sx={{ width: 150, height: 150 }}>
              {tempUser.avatar ? (
                <Box
                  component="img"
                  src={`${tempUser.avatar}`}
                  sx={{ width: "100%", height: "100%" }}
                />
              ) : (
                <Person sx={{ width: "95%", height: "95%" }} />
              )}
            </Avatar>
          </Box>
          <MyDivider />
          {/* the box under the avatar */}
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
              value={tempUser.username}
              onChange={(e) => handleUserChange("username", e.target.value)}
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
              value={tempUser.email}
              onChange={(e) => handleUserChange("email", e.target.value)}
            />

            <FormControl component="fieldset" margin="normal">
              <Typography variant="subtitle1" color={"white"} gutterBottom>
                Gender
              </Typography>

              <RadioGroup
                color="white"
                aria-label="gender"
                name="gender"
                value={tempUser.gender}
                onChange={(e) => handleUserChange("gender", e.target.value)}
                sx={{ marginBottom: 1 }}
              >
                <FormControlLabel
                  value={Gender.Male}
                  control={<Radio />}
                  label="Male"
                  sx={{ color: "white" }}
                />
                <FormControlLabel
                  value={Gender.Female}
                  control={<Radio />}
                  label="Female"
                  sx={{ color: "white" }}
                />
              </RadioGroup>
            </FormControl>
            <Box margin="normal">
              <DatePickerComponent
                selectedDate={tempUser.dob}
                onChange={handleDateChange}
              />
            </Box>
            <CountrySelector
              country={tempUser.country}
              onChange={handleCountryChange}
            ></CountrySelector>
            <LanguageSelector
              languages={tempUser.languages}
              onChange={handleLanguageChange}
            ></LanguageSelector>
            <BioTextarea
              bio={tempUser.bio ? tempUser.bio : ""}
              onChange={handleBioChange}
            ></BioTextarea>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default EditPersonalDetailsSection;
