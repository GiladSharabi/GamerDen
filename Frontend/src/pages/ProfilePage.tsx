import { Grid, Typography } from "@mui/material";
import GamingPreferencesSection from "../sections/GamingPreferencesSection";
import PersonalDetailsSection from "../sections/PersonalDetailsSection";
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { username } = useParams();

  // todo: getuserbyusername

  return (
    <Grid
      sx={{
        alignItems: "start",
        p: 2,
      }}
    >
      <PersonalDetailsSection />

      <Typography variant="h6" color="white" fontSize={40}>
        Gaming Preferences
      </Typography>
      <GamingPreferencesSection />
    </Grid>
  );
};

export default ProfilePage;
