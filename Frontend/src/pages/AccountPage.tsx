import { Grid, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import GamingPreferencesSection from "../sections/GamingPreferencesSection";
import PersonalDetailsSection from "../sections/PersonalDetailsSection";
import Loading from "../components/Loading";

const AccountPage = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Loading />
  }

  const { user } = authContext;

  return (
    <Grid className="items-start p-2">
      <PersonalDetailsSection />
      <GamingPreferencesSection />
    </Grid >
  );
};

export default AccountPage;
