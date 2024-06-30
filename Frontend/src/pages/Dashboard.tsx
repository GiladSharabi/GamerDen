import { NullUser, UserPreferences } from "../api/types";
import SearchPartnersSection from "../sections/SearchPartnersSection";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import UserCards from "../components/UserCards";
import { Box } from "@mui/material";
import Loading from "../components/Loading";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <Loading />;
  }
  const { user, setUser } = authContext;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (user !== NullUser) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  const handleSubmit = (tempPreferences: UserPreferences) => {
    // search in DB
  };

  return (
    <Box>
      <SearchPartnersSection
        buttonLabel="Search"
        onSubmitClick={handleSubmit}
        userPref={user.preferences}
      />
      <UserCards />
    </Box>
  );
};

export default Dashboard;
