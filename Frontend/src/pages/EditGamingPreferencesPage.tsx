import EditGamingPreferencesSection from "../sections/EditGamingPreferencesSection";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { UserPreferences } from "../api/types";
import { updateUser } from "../api/api.endpoints";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const EditGamingPreferencesPage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Loading />;
  }

  const { user, setUser } = authContext;

  const handleSaveClick = (tempPreferences: UserPreferences) => {
    const tempUser = { ...user, preferences: tempPreferences };
    setUser(tempUser);
    updateUser(tempUser);
    navigate("/account");
  };

  return (
    <EditGamingPreferencesSection
      buttonLabel="Save preferences"
      onSubmitClick={handleSaveClick}
      userPref={user.preferences}
    />
  );
};

export default EditGamingPreferencesPage;
