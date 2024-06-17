import { Avatar, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Person } from "@mui/icons-material";
import { Gender } from "../api/types";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { MdModeEditOutline } from "react-icons/md";

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

  const handleEditPersonalDetails = () => {
    navigate("/edit-personal-details");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        p: 2,
        marginBottom: 4,
      }}
    >
      <Avatar sx={{ width: 150, height: 150, mr: 2 }}>
        {user.avatar ? (
          <Box
            component="img"
            src={`${user.avatar}`}
            sx={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Person sx={{ width: "95%", height: "95%" }} />
        )}
      </Avatar>

      <Box>
        {/* the Box of the details next to the photo */}
        <Typography variant="h6" color="white" fontSize={40}>
          {user.username}
        </Typography>
        <Typography
          variant="body2"
          color="white"
          fontSize={18}
          marginBottom={1}
        >
          {user.bio}
        </Typography>

        {/* the Box of the gender,age,counry */}
        <Box
          marginBottom={1}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            paddingRight: 2,
          }}
        >
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            paddingRight: 2,
          }}
        >
          <FaMicrophone className="mr-1" size={18} color="white" />
          <Typography color="white">{user.languages.join(", ")}</Typography>
        </Box>
      </Box>
      <Button
        startIcon={<MdModeEditOutline />}
        variant="contained"
        size="medium"
        onClick={handleEditPersonalDetails}
        sx={{
          width: "wrap",
          backgroundColor: "#555555",
          color: "#BBBBBB",
          border: "1px solid transparent",
          "&:hover": {
            color: "white",
            backgroundColor: "#222222",
            border: "1px solid white",
          },
        }}
      >
        Edit
      </Button>
    </Box>
  );
};

export default PersonalDetailsSection;
