import { Avatar, Box, Grid, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
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
import theme from "../components/Theme";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple email regex
const usernameRegex = /^.{6,}$/; // at least 6 characters
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/; // at least 8 characters, 1 number, 1 special char

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(NullUser);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    discord: "",
    password: "",
    confirmPassword: "",
    gender: "",
    country: "",
    languages: ""
  });

  const handleUserChange = (name: keyof User, value: string | Date | string[]) => {
    setUser({ ...user, [name]: value });
  };

  const validateFields = () => {
    const newErrors = {
      username: usernameRegex.test(user.username) ? "" : "Username must be at least 6 characters long.",
      email: user.email && emailRegex.test(user.email) ? "" : "Please enter a valid email.",
      discord: user.discord ? "" : "Please enter Discord username.",
      password: user.password && passwordRegex.test(user.password) ? "" : "Password must be at least 8 characters long and contain at least one number and one special character.",
      confirmPassword: confirmPassword ? "" : "Please enter confirm password.",
      gender: user.gender !== Gender.None ? "" : "Please select gender.",
      country: user.country ? "" : "Please select country.",
      languages: user.languages.length ? "" : "Please select at least 1 language.",
    };

    if (confirmPassword && confirmPassword !== user.password) {
      newErrors.confirmPassword = "Passwords do not match!";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      try {
        const result = await signup(user);
        if (result.error || result.emailError || result.usernameError) {
          setErrors(errors => ({
            ...errors,
            email: result.emailError || "",
            username: result.usernameError || "",
            form: result.error || ""
          }));
        } else {
          navigate("/login");
        }
      } catch (e) {
        console.log("Error in signup:", e);
        setErrors(errors => ({ ...errors, form: "Error in signup" }));
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="min-h-screen flex justify-center items-center overflow-auto">
        <Grid className="flex flex-col items-center justify-center p-6 bg-opacity-80 bg-white backdrop-blur-md rounded-2xl max-w-lg w-full mt-10 mb-20"
          style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)' }}
        >
          <Box className="flex flex-col items-center p-8">
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
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
                onConfirmPasswordChange={setConfirmPassword}
                errors={errors}
              />

              <DatePickerComponent
                selectedDate={user.dob}
                onChange={(date) => handleUserChange("dob", date)}
              />
              <CountrySelector
                country={user.country}
                onChange={(country) => handleUserChange("country", country)}
                countryError={errors.country}
              />
              <LanguageSelector
                languages={user.languages}
                onChange={(languages) => handleUserChange("languages", languages)}
                languageError={errors.languages}
              />
              <BioTextarea
                bio={user.bio}
                onChange={(value) => handleUserChange("bio", value)}
              />
              <SubmitButton onClick={handleSubmit} />
            </Box>
          </Box>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default SignUp;
