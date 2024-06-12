import {
  Box,
  Grid,
  Button,
  ThemeProvider,
} from "@mui/material";
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

const LoggedinHomePage = () => {
  const [searchProps, setSearchProps] = useState<SearchProps>({
    platforms: [],
    isVoice: false,
    soloOrGroup: SoloOrGroup.None,
    prefGender: Gender.None,
    region: "",
    teammatePlatform: [],
    ageRange: {
      minAge: 18,
      maxAge: 90,
    },
  });

  const handleVoiceClick = () => {
    setSearchProps((prev) => ({
      ...prev,
      isVoice: !prev.isVoice,
    }));
  };
  const handlePlatformChange = (
    event: React.MouseEvent<HTMLElement>,
    newPlatform: Platform
  ) => {
    setSearchProps((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(newPlatform)
        ? prev.platforms.filter((platform) => platform !== newPlatform)
        : [...prev.platforms, newPlatform],
    }));
  };
  const handleTeammatePlatformChange = (
    event: React.MouseEvent<HTMLElement>,
    newPlatform: Platform
  ) => {
    setSearchProps((prev) => ({
      ...prev,
      teammatePlatform: prev.teammatePlatform.includes(newPlatform)
        ? prev.teammatePlatform.filter((platform) => platform !== newPlatform)
        : [...prev.teammatePlatform, newPlatform],
    }));
  };

  const handleSoloGroupChange = (choice: SoloOrGroup) => {
    setSearchProps((prev) => ({
      ...prev,
      soloOrGroup: choice,
    }));
  };
  const handleGenderChange = (gender: Gender) => {
    setSearchProps((prev) => ({
      ...prev,
      prefGender: gender,
    }));
  };
  const handleRegionChange = (selectedRegion: string) => {
    setSearchProps((prev) => ({
      ...prev,
      region: selectedRegion,
    }));
  };

  const handleAgeRangeChange = (event: Event, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setSearchProps((prev) => ({
      ...prev,
      ageRange: {
        minAge: newValue[0],
        maxAge: newValue[1],
      },
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container className="flex justify-center mt-10">
        <Grid>
          <Box
            bgcolor="background.default"
            p={2}
            borderRadius={4}
            display="flex flex-column"
            flexDirection="column"
          >
            {/* the Box that hold all fields */}
            <GameSelector />
            <PlatformSelector
              label="Select Platform"
              selectedPlatforms={searchProps.platforms}
              onChange={handlePlatformChange}
            />
            <RegionSelector
              region={searchProps.region}
              onChange={handleRegionChange}
              label="Select Region"
            />
            <SoloOrGroupSelector
              label="Are you searching alone or with other group?"
              soloOrGroup={searchProps.soloOrGroup}
              onChange={handleSoloGroupChange}
            />
            <PreferedGenderSelector
              label="Which gender do you prefer to play with?"
              selectedGender={searchProps.prefGender}
              onChange={handleGenderChange}
            />
            <PlatformSelector
              label="Select teammate Platform"
              selectedPlatforms={searchProps.teammatePlatform}
              onChange={handleTeammatePlatformChange}
            />
            <AgeRangeSelector
              label="Between what ages are your ideal teammates?"
              minAge={searchProps.ageRange.minAge}
              maxAge={searchProps.ageRange.maxAge}
              onChange={handleAgeRangeChange}
            />
            <VoiceSelector
              isVoice={searchProps.isVoice}
              onChange={handleVoiceClick}
            />
            <Button
              startIcon={<IoSearch />}
              variant="contained"
              size="medium"
              sx={{
                width: "30%",
                fontWeight: "bold",
                fontSize: "20px",
                backgroundColor: "#555555",
                color: "#BBBBBB",
                border: "1px solid transparent",
                "&:hover": {
                  color: "white",
                  backgroundColor: "#222222",
                  border: "1px solid white",
                },
              }}
            >
              Search
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box className="flex justify-center mt-10" >
        <UserCards />
      </Box>
    </ThemeProvider >
  );
};

export default LoggedinHomePage;
