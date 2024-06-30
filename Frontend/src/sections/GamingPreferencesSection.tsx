import { Box, Grid, Typography, Button, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdModeEditOutline, MdMic, MdMicOff } from "react-icons/md";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import Loading from "../components/Loading";
import { Game } from "../api/types";

const GamingPreferencesSection = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Loading />;
  }

  const { user } = authContext;
  const { preferences } = user;
  preferences.games = preferences.games || [];
  const navigate = useNavigate();

  const handleEditGamingPreferences = () => {
    navigate("/edit-gaming-preferences");
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ marginBottom: 10 }}>
      <Box
        sx={{
          p: 6,
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(5px)",
          borderRadius: 4,
          width: "600px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Typography variant="h6" color="primary" sx={{ textAlign: "center", mb: 2 }}>
          My Gaming Preferences
        </Typography>
        <List dense>
          <ListItem sx={{ py: 1 }}>
            <ListItemText
              primary={`Games:`}
              secondary={
                preferences.games.length === 0 ? "No games selected yet" : preferences.games.map((game: Game) => game.name).join(", ")
              }
              primaryTypographyProps={{ sx: { fontWeight: "bold" } }}
            />
          </ListItem>
          <ListItem sx={{ py: 1 }}>
            <ListItemText primary={`Platform: `} secondary={preferences.platform.join(", ")} />
          </ListItem>
          <ListItem sx={{ py: 1 }}>
            <ListItemText primary={`Region: `} secondary={preferences.region} />
          </ListItem>
          <ListItem sx={{ py: 1 }}>
            <ListItemText primary={`Preferred Gender:`} secondary={preferences.preferred_gender} />
          </ListItem>
          <ListItem sx={{ py: 1 }}>
            <ListItemText primary={`Teammate Platform: `} secondary={preferences.teammate_platform.join(", ")} />
          </ListItem>
          <ListItem sx={{ py: 1 }}>
            <ListItemText
              primary={`Voice:`}
              secondary={
                preferences.voice ? (
                  <MdMic size={20} />
                ) : (
                  <MdMicOff size={20} />
                )
              }
            />
          </ListItem>
          <ListItem sx={{ py: 1 }}>
            <ListItemText primary={`Age Range:`} secondary={`${user.preferences.min_age} - ${user.preferences.max_age}`} />
          </ListItem>
        </List>
        <Grid container justifyContent="center">
          <Button
            startIcon={<MdModeEditOutline />}
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleEditGamingPreferences}
            sx={{ mt: 4 }}
          >
            Edit Preferences
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
};

export default GamingPreferencesSection;
