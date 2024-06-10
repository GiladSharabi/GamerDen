import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  Paper,
  Box,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { Login, Edit, VideogameAsset } from "@mui/icons-material";
import { getGames, signup } from "../api/api.endpoints";
import { User, Gender } from "../api/types";

const HomePage = () => {
  const handleClick = async () => {
    try {
      const user: User = {
        username: "gasdilad",
        email: "gilaasdd1197@gmail.com",
        password: "asd",
        gender: Gender.None,
        dob: new Date(Date.now()),
        country: "Israel",
        languages: ["Hebrew", "English"],
      };
      const resultUser = await signup(user);
      console.log(resultUser);
      // const games = await getGames();
      // console.log(games);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        component={Paper}
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url(./src/images/LoginBackground.jpeg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(5px)",
            p: 4,
            borderRadius: 4,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <VideogameAsset />
          </Avatar>
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Welcome to GamerDen
          </Typography>
          <Typography
            component="h2"
            variant="h6"
            sx={{ textAlign: "center", mt: 2 }}
          >
            Embark on your gaming journey with the perfect companion.
            <br />
            Discover your ideal gaming partner and elevate your gaming
            experience to new heights!
          </Typography>
          <Divider
            sx={{
              width: "100%",
              my: 3,
              backgroundColor: "primary.main",
              height: "3px",
            }}
          />
          <Box
            sx={{
              mt: 4,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <RouterLink to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Login />}
                sx={{ fontWeight: "bold", width: "200px" }}
              >
                Sign In
              </Button>
            </RouterLink>
            <RouterLink to="/sign-up" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                sx={{ fontWeight: "bold", width: "200px" }}
              >
                Sign Up
              </Button>
            </RouterLink>
            <Button
              onClick={handleClick}
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              sx={{ fontWeight: "bold", width: "200px" }}
            >
              Testing 123
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HomePage;
