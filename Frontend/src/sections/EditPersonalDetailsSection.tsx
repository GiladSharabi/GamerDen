import {
  Avatar,
  Box,
  Grid,
  Typography,
  Button,
  FormControl,
  RadioGroup,
  Radio,
  TextField,
  FormControlLabel,
} from "@mui/material";
import { useState, useRef } from "react";
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
  emailError: string;
};

const EditPersonalDetailsSection = ({
  user,
  buttonLabel,
  onSaveClick,
  emailError,
}: Props) => {
  const [tempUser, setTempUser] = useState<User>(user);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const genderValues = Object.values(Gender);
  const filteredGenderValues = genderValues.filter(
    (value) => value !== Gender.None && value !== Gender.Both
  );

  const [usernameError, setUsernameError] = useState<string>("");

  const handleChange = (name: keyof User, value: any) => {
    setTempUser({ ...tempUser, [name]: value });
  };

  const handleSubmit = async () => {
    if (!tempUser.username) {
      setUsernameError("Please enter Username.");
    } else {
      setUsernameError("");
    }
    if (!tempUser.email) {
      handleChange("email", "Please enter Email.");
    } else {
      handleChange("email", "");
    }
  };

  const handleSaveClick = () => {
    onSaveClick(tempUser);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (ctx) {
            const maxWidth = 180;
            const maxHeight = 180;
            let { width, height } = img;

            if (width > height) {
              if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
              }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            const resizedImage = canvas.toDataURL("image/jpeg", 0.7); // Adjust the quality if needed
            setTempUser({ ...tempUser, avatar: resizedImage });
          } else {
            console.error(
              "2D context not supported or canvas already initialized"
            );
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        className="p-4 rounded-lg flex flex-col mb-20 mt-5"
        sx={{
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(5px)",
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
          width: "600px",
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Avatar sx={{ width: 150, height: 150, cursor: "pointer" }}>
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
          </label>
        </Box>
        <MyDivider color="black" />
        <Box>
          <TextField
            error={!!emailError}
            helperText={emailError}
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={tempUser.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <FormControl component="fieldset" margin="normal">
            <Typography gutterBottom>Gender</Typography>

            <RadioGroup
              name="gender"
              value={tempUser.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              sx={{ marginBottom: 1 }}
            >
              {filteredGenderValues.map((gender: Gender, index) => (
                <FormControlLabel
                  key={index}
                  value={gender}
                  control={<Radio />}
                  label={gender}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Box margin="normal">
            <DatePickerComponent
              selectedDate={tempUser.dob}
              onChange={(date) => handleChange("dob", date || new Date())}
            />
          </Box>
          <CountrySelector
            country={tempUser.country}
            onChange={(value) => handleChange("country", value)}
          ></CountrySelector>
          <LanguageSelector
            languages={tempUser.languages}
            onChange={(languages) => handleChange("languages", languages)}
          ></LanguageSelector>
          <BioTextarea
            bio={tempUser.bio}
            onChange={(value) => handleChange("bio", value)}
          ></BioTextarea>
          <Box className="flex items-center justify-center">
            <Button onClick={handleSaveClick} variant="contained" size="medium">
              {buttonLabel}
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default EditPersonalDetailsSection;
