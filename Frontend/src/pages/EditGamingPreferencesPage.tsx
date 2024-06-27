import EditGamingPreferencesSection from "../sections/EditGamingPreferencesSection";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { NullUser, UserPreferences } from "../api/types";
import { updateUser } from "../api/api.endpoints";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const EditGamingPreferencesPage = () => {
  const navigate = useNavigate();
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
    return <Loading />;
  }

  const handleSaveClick = (tempPreferences: UserPreferences) => {
    const tempUser = { ...user, preferences: tempPreferences };
    setUser(tempUser);
    updateUser(tempUser);
    navigate("/account");
  };

  return (
    <EditGamingPreferencesSection
      buttonLabel="Save"
      onSubmitClick={handleSaveClick}
      userPref={user.preferences}
    />
  );
};

export default EditGamingPreferencesPage;
