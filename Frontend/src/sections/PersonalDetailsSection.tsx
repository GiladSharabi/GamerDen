import { Avatar, Box, Typography, Button, Rating, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Person } from "@mui/icons-material";
import { Gender } from "../api/types";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { FaDiscord } from "react-icons/fa";
import theme from "../components/Theme";

const PersonalDetailsSection = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user } = authContext;

  const navigate = useNavigate();

  const calculateAge = (dob: Date): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  function getRating(): number {
    if (user.rating && user.rating_count) {
      return user.rating / user.rating_count;
    }
    return 0;
  }

  const handleEditPersonalDetails = () => {
    navigate("/edit-personal-details");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="flex justify-start items-center flex-row flex-wrap p-2 mb-1">
        <Avatar sx={{ width: 180, height: 180, mr: 2 }}>
          {user.avatar ? (
            <Box component="img" src={`${user.avatar}`} className="w-full h-full" />
          ) : (
            <Person sx={{ width: "95%", height: "95%" }} />
          )}
        </Avatar>

        <Box marginRight={2}>
          <Typography variant="h6" fontSize={40}>
            {user.username}
          </Typography>
          <Typography variant="body2" className="text-white text-[18px] mb-2">
            {user.bio}
          </Typography>

          {/* the Box of the gender,age,country */}
          <Box className="flex justify-start items-center flex-row flex-wrap pr-2 mb-2">
            {user.gender === Gender.Male ? (
              <IoMdMale color="blue" size={20} className="mr-2" />
            ) : (
              <IoMdFemale color="pink" size={20} className="mr-2" />
            )}
            <Typography color="white" marginRight={1}>
              {calculateAge(user.dob)}
            </Typography>
            <Typography color="white">{user?.country}</Typography>
          </Box>
          {/* languages box */}
          <Box className="flex justify-start items-center flex-row flex-nowrap mb-2">
            <FaMicrophone className="mr-2" size={18} color="white" />
            <Typography color="white">{user.languages.join(", ")}</Typography>
          </Box>
          {/* discord box */}
          <Box className="flex justify-start items-center flex-row flex-nowrap mb-2">
            <FaDiscord className="mr-2" size={18} color="white" />
            <Typography color="white">{user.discord}</Typography>
          </Box>
          <Box>
            <Rating
              name="user-rating"
              value={getRating()}
              precision={0.1}
              readOnly
            />
          </Box>
        </Box>
        <Button
          startIcon={<MdModeEditOutline />}
          variant="contained"
          size="medium"
          onClick={handleEditPersonalDetails}
        >
          Edit
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default PersonalDetailsSection;
