import { updateUser } from "../api/api.endpoints";
import { NullUser, UserPreferences } from "../api/types";
import EditGamingPreferencesSection from "../sections/EditGamingPreferencesSection";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useEffect, useState } from "react";

const LoggedinHomePage = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <div>Loading...</div>;
  }
  const { user, setUser } = authContext;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (user !== NullUser) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (tempPreferences: UserPreferences) => {
    // search in DB
  };

  return (
    <EditGamingPreferencesSection
      buttonLabel="Search"
      onSubmitClick={handleSubmit}
      userPref={user.preferences}
    />
  );
};

export default LoggedinHomePage;
