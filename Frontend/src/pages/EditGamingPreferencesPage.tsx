
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { User, UserPreferences } from "../api/types";
import { updateUser } from "../api/api.endpoints";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import PreferencesSection from "../sections/PreferencesSection";
import { jwtDecode } from "jwt-decode";

const EditGamingPreferencesPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    return <Loading />
  }

  const { user, setUser } = authContext;

  const handleSaveClick = async (preferences: UserPreferences) => {
    try {
      user.preferences = preferences;
      const result = await updateUser(user);

      if (result.accessToken) {
        const user: User = jwtDecode(result.accessToken);
        setUser(user);
        navigate("/account");
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <PreferencesSection
      buttonLabel="Save Preferences"
      onSubmitClick={handleSaveClick}
      userPref={user.preferences}
      useExistingButton={false}
    />
  );
};

export default EditGamingPreferencesPage;
