import { Grid } from "@mui/material";
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

  return (
    <Grid className="items-center p-2">
      <PersonalDetailsSection />
      <GamingPreferencesSection />
    </Grid >
  );
};

export default AccountPage;
