import {
  Avatar,
  Box,
  Typography,
  Button,
  FormControl,
  RadioGroup,
  Radio,
  TextField,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
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
  onSaveClick: (formData: FormData) => void;
  emailError: string;
};

const EditPersonalDetailsSection = ({
  user,
  buttonLabel,
  onSaveClick,
  emailError,
}: Props) => {
  const [tempUser, setTempUser] = useState<User>(user);

  const [image, setImage] = useState<string>();
  const [file, setFile] = useState<File>();

  const genderValues = Object.values(Gender);
  const filteredGenderValues = genderValues.filter(
    (value) => value !== Gender.None && value !== Gender.Both
  );

  useEffect(() => {
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }, [file]);

  const handleChange = (name: keyof User, value: any) => {
    setTempUser({ ...tempUser, [name]: value });
  };

  const handleSaveClick = () => {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('data', JSON.stringify(tempUser));
    onSaveClick(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }

  return (
    <Box className="p-10 rounded-3xl flex flex-col mb-20 mt-5 bg-white bg-opacity-80 backdrop-blur-sm"
      sx={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
        width: "500px",
      }}>
      <Box className="flex justify-center mb-2">
        <label htmlFor="avatar-input">
          <Avatar className="cursor-pointer rounded-full overflow-hidden"
            sx={{ width: 150, height: 150 }}
          >
            {image ? (
              <img src={image} className="w-full h-full object-cover" />
            ) : user.avatar ? (
              <img src={user.avatar} className="w-full h-full object-cover" />
            ) : <Person sx={{ width: "95%", height: "95%" }} />
            }
            <input
              id="avatar-input"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
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
    </Box >
  );
};

export default EditPersonalDetailsSection;
