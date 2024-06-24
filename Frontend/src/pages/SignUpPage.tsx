import { Avatar, Paper, Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NullUser, User, Gender } from "../api/types";
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

  const [hasError, setHasError] = useState<boolean>(true);
  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [discordError, setDiscordError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [genderError, setGenderError] = useState<string>("");
  const [countryError, setCountryError] = useState<string>("");
  const [languageError, setLanguageError] = useState<string>("");

  // useEffect(() => {
  //   const error: boolean = usernameError !== "";
  //   console.log("error: " + error);
  // }, [
  //   usernameError,
  //   emailError,
  //   discordError,
  //   passwordError,
  //   confirmPasswordError,
  //   genderError,
  //   countryError,
  //   languageError,
  // ]);

  const handleUserChange = (name: keyof User, value: string) => {
    setUser({ ...user, [name]: value });
  };

  const handleConfirmPasswordChange = (value: string) => {
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

  const handleSubmit = () => {
    if (!user.username) {
      setUsernameError("Please Enter Username.");
    } else {
      setUsernameError("");
    }
    if (!user.email) {
      setEmailError("Please Enter Email.");
    } else {
      setEmailError("");
    }
    if (!user.discord) {
      setDiscordError("Please Enter Discord Username");
    } else {
      setDiscordError("");
    }
    if (!user.password) {
      setPasswordError("Please Enter Password.");
    } else {
      setPasswordError("");
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Please Enter Confirm Password.");
    } else if (confirmPassword !== user.password) {
      setConfirmPasswordError("Passwords Do Not Match!");
    } else {
      setConfirmPasswordError("");
    }
    if (user.gender === Gender.None) {
      setGenderError("Please Select Gender");
    } else {
      setGenderError("");
    }
    if (user.country === "") {
      setCountryError("Please Select Country");
    } else {
      setCountryError("");
    }
    if (user.languages.length === 0) {
      setLanguageError("Please Select At Least 1 Language");
    } else {
      setLanguageError("");
    }
    // const error: boolean =
    //   !!usernameError ||
    //   !!emailError ||
    //   !!discordError ||
    //   !!passwordError ||
    //   !!confirmPasswordError ||
    //   !!genderError ||
    //   !!countryError ||
    //   !!languageError;
    // console.log("error: " + error);
    // setHasError(error);
    // if (hasError === false) {
    //   try {
    //     // const result = await signup(user);
    //     // console.log("signup result: " + result);
    //     // navigate("/login");
    //   } catch (e) {
    //     console.log("Error in signup" + e);
    //   }
    // }
  };

  useEffect(() => {
    const error =
      !!usernameError ||
      !!emailError ||
      !!discordError ||
      !!passwordError ||
      !!confirmPasswordError ||
      !!genderError ||
      !!countryError ||
      !!languageError;
    // console.log("error: " + error);
    setHasError(error);
  }, [
    usernameError,
    emailError,
    discordError,
    passwordError,
    confirmPasswordError,
    genderError,
    countryError,
    languageError,
  ]);

  // useEffect(() => {
  //   console.log("hasError: " + hasError);
  //   const handleSignup = async () => {
  //     if (hasError === false) {
  //       try {
  //         const result = await signup(user);
  //         console.log("signup result: " + result);
  //         navigate("/login");
  //       } catch (e) {
  //         console.log("Error in signup" + e);
  //       }
  //     }
  //   };
  //   if (hasError === true) {
  //     return;
  //   } else {
  //     handleSignup();
  //   }
  // }, [hasError]);

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
              onConfirmPasswordChange={handleConfirmPasswordChange}
              usernameError={usernameError}
              emailError={emailError}
              discordError={discordError}
              passwordError={passwordError}
              confirmPasswordError={confirmPasswordError}
              genderError={genderError}
            />
            <DatePickerComponent
              selectedDate={user.dob}
              onChange={handleDateChange}
            />
            <CountrySelector
              country={user.country}
              onChange={handleCountryChange}
              countryError={countryError}
            />
            <LanguageSelector
              languages={user.languages}
              onChange={handleLanguageChange}
              languageError={languageError}
            />
            <BioTextarea
              bio={user.bio || ""}
              textColor="black"
              onChange={(value) => setUser({ ...user, bio: value })}
            />
            <SubmitButton onClick={handleSubmit} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
