import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
} from "@mui/material";
import { IoSearch } from "react-icons/io5";
import GameSelector from "../components/PreferencesComponents/GameSelector";
import PlatformSelector from "../components/PreferencesComponents/PlatformSelector";
import RegionSelector from "../components/PreferencesComponents/RegionSelector";
import SoloOrGroupSelector from "../components/PreferencesComponents/SoloOrGroupSelector";
import PreferedGenderSelector from "../components/PreferencesComponents/PreferedGenderSelector";
import AgeRangeSelector from "../components/PreferencesComponents/AgeRangeSelector";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const EditGamingPreferencesPage = () => {
  const navigate = useNavigate();

  const handleSaveClick = () => { };
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user } = authContext;

  return (
    <></>
  );
};

export default EditGamingPreferencesPage;
