import { Avatar, Box, Typography, Button, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Person } from "@mui/icons-material";
import { Gender } from "../api/types";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { FaLanguage } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { FaDiscord } from "react-icons/fa";
import Loading from "../components/Loading";

const PersonalDetailsSection = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Loading />;
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
    <Box
      className="flex justify-center items-center flex-row flex-wrap p-4"
      sx={{
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(5px)",
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
        p: 2,
        mb: 1,
        width: "600px"
      }}
    >
      <Avatar sx={{ width: 100, height: 100, mr: 2 }}>
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
        <Typography variant="body2" marginBottom={2}>
          {user.bio}
        </Typography>

        {/* the Box of the gender,age,country */}
        <Box className="flex justify-start items-center flex-row flex-wrap pr-2 mb-2">
          {user.gender === Gender.Male ? (
            <IoMdMale color="blue" size={30} className="mr-2" />
          ) : (
            <IoMdFemale color="pink" size={30} className="mr-2" />
          )}
          <Typography marginRight={1}>
            {calculateAge(user.dob ? user.dob : new Date())}
          </Typography>
          <Typography >{user?.country}</Typography>
        </Box>
        {/* languages box */}
        <Box className="flex justify-start items-center flex-row flex-nowrap mb-2">
          <FaLanguage className="mr-2" size={30} />
          <Typography >{user.languages.join(", ")}</Typography>
        </Box>
        {/* discord box */}
        <Box className="flex justify-start items-center flex-row flex-nowrap mb-2">
          <FaDiscord className="mr-2" size={30} />
          <Typography >{user.discord}</Typography>
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
        Edit Profile
      </Button>
    </Box>
  );
};

export default PersonalDetailsSection;
