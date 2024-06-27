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

  const { preferences } = user;

  const navigate = useNavigate();

  const handleEditGamingPreferences = () => {
    navigate("/edit-gaming-preferences");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid sx={{ width: "25%", marginBottom: 10 }}>
        <Typography align="center" variant="h6" color="white" fontSize={30}>
          My Preferences
        </Typography>
        <Box
          color={theme.palette.text.primary}
          bgcolor="background.default"
          p={2}
          borderRadius={4}
          display="flex"
          flexDirection="column"
        >
          <>
            <Grid className="space-y-2">
              <Typography variant="body1" className="text-lg">
                <strong>Games:</strong>{" "}
                {preferences.games?.map((game: any) => game.name).join(", ")}
              </Typography>

              <Typography variant="body1" className="text-lg">
                <strong>Platform:</strong> {preferences.platform.join(", ")}
              </Typography>

              <Typography variant="body1" className="text-lg">
                <strong>Region:</strong> {preferences.region}
              </Typography>

              <Typography variant="body1" className="text-lg">
                <strong>Preferred Gender:</strong>{" "}
                {preferences.preferred_gender}
              </Typography>

              <Typography variant="body1" className="text-lg">
                <strong>Teammate Platform:</strong>{" "}
                {preferences.teammate_platform.join(", ")}
              </Typography>

              <Typography variant="body1" className="text-lg">
                <strong>Voice:</strong> {preferences.voice ? "Yes" : "No"}
              </Typography>

              <Typography variant="body1" className="text-lg">
                <strong>Age Range:</strong>{" "}
                {user.preferences.min_age + " - " + user.preferences.max_age}
              </Typography>
            </Grid>

            <Box>
              <Button
                startIcon={<MdModeEditOutline />}
                variant="contained"
                size="medium"
                style={{ marginTop: 10 }}
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
