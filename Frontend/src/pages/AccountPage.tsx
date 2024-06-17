import { Grid, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import GamingPreferencesSection from "../sections/GamingPreferencesSection";
import PersonalDetailsSection from "../sections/PersonalDetailsSection";

const AccountPage = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user } = authContext;

  return (
    <Grid
      sx={{
        alignItems: "start",
        p: 2,
      }}
    >
      <PersonalDetailsSection />
      <Typography variant="h6" color="white" fontSize={40} marginRight={2}>
        Gaming Preferences
      </Typography>
      <GamingPreferencesSection />
    </Grid>
  );
};

export default AccountPage;
