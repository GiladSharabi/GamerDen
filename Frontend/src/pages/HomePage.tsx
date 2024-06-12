import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Button,
  Paper,
  Box,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { Login, Edit, VideogameAsset } from "@mui/icons-material";

const HomePage = () => {
  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={12}
        sm={4}
        component={Paper}
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 1,
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(5px)",
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
            maxWidth: "700px",
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
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HomePage;
