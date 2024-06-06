import {
  Avatar,
  CssBaseline,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Gender, User } from "../api/types";
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
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    dob: new Date(),
    country: "",
    gender: Gender.None,
    languages: [],
    bio: "",
  });

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const navigate = useNavigate();
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

  const handleDateChange = (date: Date | null) => {
    setUser({ ...user, dob: date || new Date() });
  };

  const handleSubmit = async () => {
    if (!user.username) {
      setUsernameError("Please enter Username.");
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

    // console.log(user);
    // if (
    //   user.username &&
    //   user.email &&
    //   user.password &&
    //   (user.dob.getFullYear() !== today.getFullYear() ||
    //     user.dob.getMonth() !== today.getMonth() ||
    //     user.dob.getDate() !== today.getDate()) &&
    //   user.country &&
    //   user.gender !== Gender.None &&
    //   user.languages.length !== 0
    // ) {
    //   try {
    //     setHasError(false);
    //     const result = await signup(user);
    //     navigate("/login");
    //     // console.log(user);
    //   } catch (e) {
    //     console.log("Error signup: " + e);
    //   }
    // } else {
    //   setHasError(true);
    // }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        component={Paper}
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url(./src/images/LoginBackground.jpeg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          margin: 0,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(5px)",
            p: 4,
            borderRadius: 4,
            mt: 8,
            mb: 8,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <PersonAdd />
          </Avatar>
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
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
