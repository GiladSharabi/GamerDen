import { Grid } from "@mui/material";
import GamingPreferencesSection from "../sections/GamingPreferencesSection";
import PersonalDetailsSection from "../sections/PersonalDetailsSection";
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { username } = useParams();

  // todo: getuserbyusername

  return (
    <Grid>
      <PersonalDetailsSection />

      <GamingPreferencesSection />
    </Grid>
  );
};

export default ProfilePage;
