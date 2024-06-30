import { Grid, Box, ThemeProvider } from "@mui/material";
import GamingPreferencesSection from "../sections/GamingPreferencesSection";
import PersonalDetailsSection from "../sections/PersonalDetailsSection";
import { useParams } from "react-router-dom";
import theme from "../components/Theme";
const ProfilePage = () => {
  const { username } = useParams();

  // todo: getuserbyusername

  return (
    <ThemeProvider theme={theme}>
      <Box className="flex flex-col items-center justify-center min-h-screen p-4">
        <Box className="mb-8">
          <PersonalDetailsSection isEditable={false} />
        </Box>
        <Box>
          <GamingPreferencesSection isEditable={false} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ProfilePage;
