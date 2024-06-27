import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { Rating } from "@mui/material";
import { Chat, Gamepad, Person } from "@mui/icons-material";
import { User, Gender } from "../api/types";
import theme from "./Theme";
import { useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { IoMdMale, IoMdFemale } from "react-icons/io";

type CardProps = {
  user: User;
};

const UserCard = ({ user }: CardProps) => {
  const [chatClick, setChatClick] = useState<boolean>(false);

  const handleStartChatClick = () => {
    setChatClick(true);
  };

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

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item marginRight={1}>
              {/* grid of the avatar */}
              <Link to={`/profile/${user.username}`}>
                <Avatar>
                  {user.avatar ? (
                    <Box component="img" src={`${user.avatar}`} />
                  ) : (
                    <Person />
                  )}
                </Avatar>
              </Link>
            </Grid>
            <Grid>
              {/* grid of the username */}
              <Typography
                variant="h6"
                color="primary"
                align="left"
                sx={{ mt: 2, ml: 1 }}
              >
                <Link to={`/profile/${user.username}`} className="no-underline">
                  {user.username}
                </Link>
              </Typography>
              <Box
                // {/* the Box of the gender,age,counry */}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "row",
                  height: "100%",
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
            </Grid>
          </Grid>
          <Box mt={2}>
            <Typography variant="body1">
              <strong>Bio:</strong> {user.bio ? user.bio : "No bio available"}
            </Typography>
          </Box>
          <Box mt={2}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Gamepad />
              </Grid>
              <Grid item>
                <Typography variant="body1" color="primary">
                  <strong>Games:</strong>
                </Typography>
              </Grid>
            </Grid>
            <Grid container mt={1} spacing={1} justifyContent="start">
              {user.preferences.games.slice(0, 4).map((game, index) => (
                <Grid item key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    <img
                      className="game-image mb-2 mr-2"
                      src={game.cover}
                      alt={game.name}
                      style={{ width: 30, height: 30 }}
                    />
                    <Typography>{game.name}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box mt={2}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <Typography
                  variant="body1"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  User Rating:
                </Typography>
              </Grid>
              <Grid item>
                <Rating
                  name="user-rating"
                  value={getRating()}
                  precision={0.1}
                  readOnly
                />
              </Grid>
            </Grid>
          </Box>
          <Box mt={2} textAlign="center">
            {/* start chatting box */}
            {chatClick ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={1}
                borderRadius={1}
                bgcolor="info.dark"
                color="text.primary"
                sx={{ mt: 2 }}
              >
                <FaDiscord className="mr-2" style={{ fontSize: "1.5rem" }} />
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ fontSize: "1.25rem" }}
                >
                  {user.discord}
                </Typography>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                startIcon={<Chat />}
                onClick={handleStartChatClick}
                sx={{ color: theme.palette.text.primary }}
              >
                Start Chatting
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default UserCard;
