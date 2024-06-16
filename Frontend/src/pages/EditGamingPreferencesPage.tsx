import React, { useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import { IoSearch } from "react-icons/io5";
import GameSelector from "../components/PreferencesComponents/GameSelector";
import PlatformSelector from "../components/PreferencesComponents/PlatformSelector";
import RegionSelector from "../components/PreferencesComponents/RegionSelector";
import SoloOrGroupSelector from "../components/PreferencesComponents/SoloOrGroupSelector";
import PreferedGenderSelector from "../components/PreferencesComponents/PreferedGenderSelector";
import age_rangeSelector from "../components/PreferencesComponents/age_rangeSelector";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import EditGamingPreferencesSection from "../components/EditGamingPreferencesSection";
import { updateUser } from "../api/api.endpoints";
import { UserPreferences } from "../api/types";

const EditGamingPreferencesPage = () => {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <div>Loading...</div>;
  }
  const { user } = authContext;

  // const [pref, setPref] = useState<UserPreferences>(user.preferences);

  const handleSaveClick = () => {
    // user.preferences = pref;
    // console.log(user.preferences);
    // updateUser(user);
    // setPref(user?.preferences);
    // console.log(pref);
  };

  return (
    <EditGamingPreferencesSection
      buttonLabel="Save"
      onSubmitClick={handleSaveClick}
      // userPref={pref}
      // setPref={setPref}
    />
  );
};

export default EditGamingPreferencesPage;
