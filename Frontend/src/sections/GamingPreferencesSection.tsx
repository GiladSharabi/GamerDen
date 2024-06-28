import { Box, Grid, Typography, Button, ThemeProvider, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdModeEditOutline, MdMic, MdMicOff } from "react-icons/md";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import Loading from "../components/Loading";
import theme from "../components/Theme";
import backgroundImage from "../assets/images/background-black.jpg";

const GamingPreferencesSection = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Loading />;
  }

  const { user } = authContext;
  const { preferences } = user;
  const navigate = useNavigate();

  const handleEditGamingPreferences = () => {
    navigate("/edit-gaming-preferences");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12} sm={6} md={4} lg={3} sx={{ marginBottom: 10 }}>
        <Box
          className="mx-auto max-w-xl text-white rounded-lg shadow-lg p-4 w-1/3"
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0 8px 16px rgba(0,0,0,1)", // Intense shadow
          }}
        >
          <Typography variant="h6" color="primary" className="text-lg text-center mb-2">
            My Gaming Preferences
          </Typography>
          <List dense>
            <ListItem sx={{ py: 1 }}>
              <ListItemText
                primary={`Games:`}
                secondary={preferences.games.length === 0 ? "No games selected yet" : preferences.games.map((game) => game.name).join(", ")}
              />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText
                primary={`Platform: `}
                secondary={preferences.platform.join(", ")}
                className="font-bold"
              />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText
                primary={`Region: `}
                secondary={preferences.region}
                className="font-bold"
              />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText
                primary={`Preferred Gender:`}
                secondary={preferences.preferred_gender}
              />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText
                primary={`Teammate Platform: `}
                secondary={preferences.teammate_platform.join(", ")}
                className="font-bold"
              />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText
                primary={`Voice:`}
                secondary={
                  preferences.voice ? (
                    <MdMic size={20} className="text-green-500" />
                  ) : (
                    <MdMicOff size={20} className="text-red-500" />
                  )
                }
              />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText
                primary={`Age Range:`}
                secondary={`${user.preferences.min_age} - ${user.preferences.max_age}`}
              />
            </ListItem>
          </List>
          <Grid container justifyContent="center">
            <Button
              startIcon={<MdModeEditOutline />}
              variant="contained"
              color="primary"
              size="medium"
              onClick={handleEditGamingPreferences}
              className="mt-4"
            >
              Edit Preferences
            </Button>
          </Grid>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default GamingPreferencesSection;
