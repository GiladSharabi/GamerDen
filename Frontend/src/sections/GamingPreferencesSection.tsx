import { Box, Grid, Typography, Button, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "../components/Theme";
import MyDivider from "../components/MyDivider";
import { MdModeEditOutline } from "react-icons/md";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

const GamingPreferencesSection = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user } = authContext;

  const navigate = useNavigate();

  const handleEditGamingPreferences = () => {
    navigate("/edit-gaming-preferences");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid sx={{ marginTop: 4, width: "50%" }}>
        {/* the Grid of the user gaming preferences */}

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
              {user.preferences.games?.map((game) => game.name).join(", ")}
            </Typography>

            <MyDivider />
            <Typography variant="body1">
              <strong>Platform:</strong> {user.preferences.platform.join(", ")}
            </Typography>
            <MyDivider />
            <Typography variant="body1">
              <strong>Region:</strong> {user.preferences.region}
            </Typography>
            <MyDivider />
            <Typography variant="body1">
              <strong>Preferred Gender:</strong>{" "}
              {user.preferences.preferred_gender}
            </Typography>
            <MyDivider />
            <Typography variant="body1">
              <strong>Teammate Platform:</strong>{" "}
              {user.preferences.teammate_platform.join(", ")}
            </Typography>
            <MyDivider />
            <Typography variant="body1">
              <strong>Voice:</strong> {user.preferences.voice ? "Yes" : "No"}
            </Typography>
            <MyDivider />
            <Typography variant="body1">
              <strong>Age Range: </strong>{" "}
              {user.preferences.min_age + " - " + user.preferences.max_age}
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
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default GamingPreferencesSection;
