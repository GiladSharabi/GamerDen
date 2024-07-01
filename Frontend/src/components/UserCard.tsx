import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Rating,
} from "@mui/material";
import { Chat, Gamepad, Person } from "@mui/icons-material";
import { FaDiscord } from "react-icons/fa";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { User, Gender } from "../api/types";
import { useState } from "react";
import GamesList from "./GamesList";

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

  const getRating = (): number => {
    return user.rating && user.rating_count
      ? user.rating / user.rating_count
      : 0;
  };

  return (

    <Card
      sx={{
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(5px)",
        borderRadius: 4,
        width: "325px",
        minWidth: "325px",
        margin: "rem",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
      }}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Link to={`/profile/${user.username}`}>
              <Avatar>
                {user.avatar ? (
                  <img src={`${user.avatar}`} alt="Avatar" />
                ) : (
                  <Person />
                )}
              </Avatar>
            </Link>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h6" color="primary">
              <Link to={`/profile/${user.username}`} className="no-underline">
                {user.username}
              </Link>
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {user.gender === Gender.Male ? (
                <IoMdMale color="blue" size={20} className="mr-2" />
              ) : (
                <IoMdFemale color="pink" size={20} className="mr-2" />
              )}
              <Typography>
                {calculateAge(user.dob ? user.dob : new Date(0))}
              </Typography>
              <Typography sx={{ ml: 1 }}>{user.country}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography variant="body1">
            <strong>Bio:</strong> {user.bio || "No bio available"}
          </Typography>
        </Box>
        <Box mt={2}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Gamepad />
            </Grid>
            <Grid item>
              <Typography variant="body1" color="primary">
                Games:
              </Typography>
            </Grid>
          </Grid>
          <GamesList games={user.preferences.games} initialSlice={3} />
        </Box>
        <Box mt={2} textAlign="center">
          <Rating
            name="user-rating"
            value={getRating()}
            precision={0.1}
            readOnly
          />
          {chatClick ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={1}
              borderRadius={1}
              bgcolor="info.main"
              color="text.primary"
              sx={{ mt: 2 }}
            >
              <FaDiscord className="text-white text-2xl mr-2" />
              <Typography variant="body1" fontWeight="bold" color="white">
                {user.discord}
              </Typography>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              startIcon={<Chat />}
              onClick={handleStartChatClick}
              sx={{ mt: 2 }}
            >
              Start Chatting
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
