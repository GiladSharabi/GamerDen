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
import { Game } from "../api/types";
import theme from "./Theme";

type CardProps = {
  username: string;
  rating: number;
  bio?: string;
  games: Game[];
  avatarUrl?: string;
};

const UserCard = ({ username, rating, bio, games, avatarUrl }: CardProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Link to={`/profile/${username}`}>
                <Avatar>
                  {avatarUrl ? (
                    <Box component="img" src={`${avatarUrl}`} />
                  ) : (
                    <Person />
                  )}
                </Avatar>
              </Link>
            </Grid>
            <Grid>
              <Typography
                variant="h6"
                color="primary"
                align="left"
                sx={{ mt: 2, ml: 2 }}
              >
                <Link to={`/profile/${username}`} className="no-underline">
                  {username}
                </Link>
              </Typography>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Typography variant="body1">
              <strong>Bio:</strong> {bio ? bio : "No bio available"}
            </Typography>
          </Box>
          <Box mt={2}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Gamepad />
              </Grid>
              <Grid item>
                <Typography variant="body1" color="primary">
                  <strong>Games:</strong>
                </Typography>
              </Grid>
            </Grid>
            <Grid container mt={1} spacing={1} justifyContent="center">
              {games.map((game, index) => (
                <Grid item key={index}>
                  <img
                    className="game-image mb-2"
                    src={game.cover}
                    alt={game.name}
                    style={{ width: 80, height: 80 }}
                  />
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
                  value={rating}
                  precision={0.1}
                  readOnly
                />
              </Grid>
            </Grid>
          </Box>
          <Box mt={2} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              startIcon={<Chat />}
              sx={{ color: theme.palette.text.primary }}
            >
              Start Chatting
            </Button>
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default UserCard;
