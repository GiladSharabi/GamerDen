import { Box, Grid, Button, ThemeProvider } from "@mui/material";
import GameSelector from "../components/PreferencesComponents/GameSelector";
import UserCards from "../components/UserCards";
import theme from "../components/Theme";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import PlatformSelector from "../components/PreferencesComponents/PlatformSelector";
import { SearchProps, Gender, SoloOrGroup } from "../api/types";
import VoiceSelector from "../components/PreferencesComponents/VoiceSelector";
import SoloOrGroupSelector from "../components/PreferencesComponents/SoloOrGroupSelector";
import PreferedGenderSelector from "../components/PreferencesComponents/PreferedGenderSelector";
import RegionSelector from "../components/PreferencesComponents/RegionSelector";
import AgeRangeSelector from "../components/PreferencesComponents/AgeRangeSelector";
import { Platform } from "../api/types";
import EditGamingPreferencesSection from "../components/EditGamingPreferencesSection";

const LoggedinHomePage = () => {
  return <EditGamingPreferencesSection />;
};

export default LoggedinHomePage;
