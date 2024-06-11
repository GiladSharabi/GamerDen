import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  Typography,
  Container,
  Button,
  ThemeProvider,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Person } from "@mui/icons-material";
import theme from "../components/Theme";
import { getUserByToken } from "../api/api.endpoints";
import { User, Gender } from "../api/types";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import MyDivider from "../components/MyDivider";
import { MdModeEditOutline } from "react-icons/md";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

const AccountPage = () => {
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

  const handleEditGamingPreferences = () => {
    navigate("/edit-gaming-preferences");
  };

  return (
    user && (
      <Grid
        // main Grid of all the section
        sx={{
          alignItems: "start",
          p: 2,
        }}
      >
        <Box
          // the Box of the profile picture section
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
        </Box>

        <Typography variant="h6" color="white" fontSize={40} marginRight={2}>
          Gaming Preferences
        </Typography>

        <ThemeProvider theme={theme}>
          <Grid sx={{ marginTop: 4, width: "50%" }}>
            {/* the Grid of the user details */}

            <Box
              color={theme.palette.text.primary}
              bgcolor="background.default"
              p={2}
              borderRadius={4}
              display="flex"
              flexDirection="column"
            >
              {/* {user.preferences ? ( */}
              <>
                <Typography variant="body1">
                  <strong>Games:</strong>{" "}
                  {user.preferences?.games &&
                    user.preferences?.games.join(", ")}
                </Typography>
                <MyDivider />
                <Typography variant="body1">
                  <strong>Platform:</strong>{" "}
                  {user.preferences?.platform &&
                    user.preferences?.platform.join(", ")}
                </Typography>
                <MyDivider />
                <Typography variant="body1">
                  <strong>Region:</strong> {user.preferences?.region}
                </Typography>
                <MyDivider />
                <Typography variant="body1">
                  <strong>Solo or Group:</strong>{" "}
                  {user.preferences?.soloOrGroup ? "Group" : "Solo"}
                </Typography>
                <MyDivider />
                <Typography variant="body1">
                  <strong>Voice:</strong>{" "}
                  {user.preferences?.voice ? "Yes" : "No"}
                </Typography>
                <MyDivider />
                <Typography variant="body1">
                  <strong>Age Range:</strong>{" "}
                  {user.preferences?.ageRange &&
                    user.preferences?.ageRange[0] +
                      " - " +
                      user.preferences?.ageRange[1]}
                </Typography>
                <MyDivider />
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
                  <Button
                    startIcon={<MdModeEditOutline />}
                    variant="contained"
                    size="medium"
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
                    onClick={handleEditGamingPreferences}
                  >
                    Edit
                  </Button>
                </Box>
              </>
              {/* ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="h6" color="red" marginRight={1}>
                      You didn't initialized your gaming preferences yet.
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          textDecoration: "underline",
                          fontWeight: "bold",
                        },
                      }}
                    >
                      Initialize now
                    </Typography>
                  </Box>
                )} */}
            </Box>
          </Grid>
        </ThemeProvider>
      </Grid>
    )
  );
};

export default AccountPage;
