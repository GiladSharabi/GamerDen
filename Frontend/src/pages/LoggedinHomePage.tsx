import { updateUser } from "../api/api.endpoints";
import { UserPreferences } from "../api/types";
import EditGamingPreferencesSection from "../components/EditGamingPreferencesSection";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

const LoggedinHomePage = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <div>Loading...</div>;
  }
  const { user, setUser } = authContext;

  const handleSubmit = (tempPreferences: UserPreferences) => {
    const tempUser = { ...user, preferences: tempPreferences };
    setUser(tempUser);
    updateUser(tempUser);
  };

  console.log(user);

  return (
    <EditGamingPreferencesSection
      buttonLabel="Search"
      onSubmitClick={handleSubmit}
      userPref={user.preferences}
    />
  );
};

export default LoggedinHomePage;
