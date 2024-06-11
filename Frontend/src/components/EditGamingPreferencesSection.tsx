import {
  Box,
  Container,
  Checkbox,
  Grid,
  Button,
  ThemeProvider,
} from "@mui/material";
import SaveButton from "./SaveButton";
import { useState } from "react";
import RegionSelector from "./RegionSelector";
import PlatformSelector from "./PlatformSelector";
import SoloOrGroupSelector from "./SoloOrGroupSelector";
import VoiceSelector from "./VoiceSelector";
import AgeRangeSelector from "./AgeRangeSelector";
import GameSelector from "../components/GameSelector";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { UserPreferences, Gender, SoloOrGroup, Platform } from "../api/types";
import { IoSearch } from "react-icons/io5";

const EditGamingPreferencesSection = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <div>Loading...</div>;
  }
  const { user } = authContext;
  const [userPref, setUserPref] = useState<UserPreferences | undefined>(
    user?.preferences
  );

  const handlePlatformChange = (
    event: React.MouseEvent<HTMLElement>,
    newPlatform: Platform
  ) => {
    setUserPref((prev) => ({
      ...prev,
      platform: prev.platform.includes(newPlatform)
        ? prev.platform.filter((platform) => platform !== newPlatform)
        : [...prev.platform, newPlatform],
    }));
  };

  return (
    userPref && (
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Box
            bgcolor="background.default"
            p={2}
            borderRadius={4}
            display="flex"
            flexDirection="column"
          >
            {/* the Box that hold all fields */}
            <GameSelector />
            <PlatformSelector
              label="Select Platform"
              selectedPlatforms={userPref.platform ? userPref.platform : []}
              onChange={handlePlatformChange}
            />
            <RegionSelector
              region={userPref.region ? userPref.region : ""}
              // onChange={handleRegionChange}
              label="Select Region"
            />
            <SoloOrGroupSelector
              label="Are you searching alone or with other group?"
              soloOrGroup={
                userPref.soloOrGroup ? userPref.soloOrGroup : SoloOrGroup.None
              }
              // onChange={handleSoloGroupChange}
            />
            <PreferedGenderSelector
              label="Which gender do you prefer to play with?"
              selectedGender={
                userPref.prefGender ? userPref.prefGender : Gender.None
              }
              // onChange={handleGenderChange}
            />
            <PlatformSelector
              label="Select teammate Platform"
              selectedPlatforms={
                userPref.teammatePlatform ? userPref.teammatePlatform : []
              }
              // onChange={handleTeammatePlatformChange}
            />
            <AgeRangeSelector
              label="Between what ages are your ideal teammates?"
              minAge={userPref.ageRange ? userPref.ageRange[0] : 18}
              maxAge={userPref.ageRange ? userPref.ageRange[1] : 90}
              // onChange={handleAgeRangeChange}
            />
            <VoiceSelector
              isVoice={userPref.voice ? userPref.voice : undefined}
              // onChange={handleVoiceClick}
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
    )
  );
};

export default EditGamingPreferencesSection;
