import EditGamingPreferencesSection from "../sections/EditGamingPreferencesSection";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useState } from "react";
import { UserPreferences } from "../api/types";
import { updateUser } from "../api/api.endpoints";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import PreferencesSection from "../sections/PreferencesSection";

const EditGamingPreferencesPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState<string>("");

  if (!authContext) {
    return <Loading />
  }

  const { user, setUser } = authContext;

  const handleSaveClick = async (preferences: UserPreferences) => {
    try {
      user.preferences = preferences;
      const result = await updateUser(user);

      if (result.user) {
        setUser(result.user);
        navigate("/account");
      } else if (result.emailError) {
        setEmailError("Email already exists.");
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
