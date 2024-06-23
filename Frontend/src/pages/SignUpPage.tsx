import { Avatar, Paper, Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NullUser, User } from "../api/types";
import UserDetails from "../components/SignUpComponents/UserDetails";
import CountrySelector from "../components/SignUpComponents/CountrySelector";
import LanguageSelector from "../components/SignUpComponents/LanguagesSelector";
import DatePickerComponent from "../components/SignUpComponents/DatePickerComponent";
import BioTextarea from "../components/SignUpComponents/BioTextarea";
import SubmitButton from "../components/SignUpComponents/SubmitButton";
import { PersonAdd } from "@mui/icons-material";
import { signup } from "../api/api.endpoints";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(NullUser);

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  useEffect(() => {
    console.log("my user: ", user);
  }, [user]);

  const today = new Date();

  const handleUserChange = (name: keyof User, value: string) => {
    setUser({ ...user, [name]: value });
  };

  const handleConfirmPasswordChanage = (value: string) => {
    setConfirmPassword(value);
  };

  const handleCountryChange = (value: string) => {
    setUser({ ...user, country: value });
  };

  const handleLanguageChange = (languages: string[]) => {
    setUser({ ...user, languages });
  };

  const handleDateChange = (date: Date) => {
    setUser({ ...user, dob: date });
  };

  const handleSubmit = async () => {
    if (!user.username) {
      setUsernameError("Please enter Username.");
      // else if (user.username exist) {

      // }
    } else {
      setUsernameError("");
    }
    if (!user.email) {
      setEmailError("Please enter Email.");
    } else {
      setEmailError("");
    }
    if (!user.password) {
      setPasswordError("Please enter Password.");
    } else {
      setPasswordError("");
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Please enter Confirm Password.");
    } else if (confirmPassword !== user.password) {
      setConfirmPasswordError("Passwords does not match!");
    } else {
      setConfirmPasswordError("");
    }
    try {
      setHasError(false);
      console.log(JSON.stringify(user, null, 2));
      const result = await signup(user);
      console.log("signup result: " + result);
      navigate("/login");
    } catch (e) {
      console.log("Error in signup" + e);
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <Grid
        item
        xs={12}
        sm={3.5}
        component={Paper}
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
          marginBottom: "100px",
          justifyContent: "center",
          p: 1,
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(5px)",
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <PersonAdd />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <UserDetails
              user={user}
              confirmPassword={confirmPassword}
              onChange={handleUserChange}
              onConfirmPasswordChange={handleConfirmPasswordChanage}
              usernameError={usernameError}
              emailError={emailError}
              passwordError={passwordError}
              confirmPasswordError={confirmPasswordError}
            />
            <DatePickerComponent
              selectedDate={user.dob}
              onChange={handleDateChange}
            />
            <CountrySelector
              country={user.country}
              onChange={handleCountryChange}
            />
            <LanguageSelector
              languages={user.languages}
              onChange={handleLanguageChange}
            />
            <BioTextarea
              bio={user.bio || ""}
              textColor="black"
              onChange={(value) => setUser({ ...user, bio: value })}
            />
            {hasError ? (
              <Alert variant="filled" severity="error">
                Please fill all fields.
              </Alert>
            ) : (
              <></>
            )}
            <SubmitButton onClick={handleSubmit} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
