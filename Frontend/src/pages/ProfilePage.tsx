import { Grid, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import GamingPreferencesSection from "../sections/GamingPreferencesSection";
import PersonalDetailsSection from "../sections/PersonalDetailsSection";
import { User } from "../api/types";

type Props = {
  userClicked: User;
};

const ProfilePage = ({ userClicked }: Props) => {
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
