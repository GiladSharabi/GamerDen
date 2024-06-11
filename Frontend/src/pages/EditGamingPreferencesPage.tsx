import {
  Avatar,
  Box,
  Grid,
  Typography,
  Container,
  Button,
  ThemeProvider,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { User, UserPreferences } from "../api/types";
import { getUserByToken } from "../api/api.endpoints";
import theme from "../components/Theme";
import GameSelector from "../components/GameSelector";
import PlatformSelector from "../components/PlatformSelector";
import VoiceSelector from "../components/VoiceSelector";
import SoloOrGroupSelector from "../components/SoloOrGroupSelector";
import PreferedGenderSelector from "../components/PreferedGenderSelector";
import RegionSelector from "../components/RegionSelector";
import AgeRangeSelector from "../components/AgeRangeSelector";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

const EditGamingPreferencesPage = () => {
  const navigate = useNavigate();

  const handleSaveClick = () => {};
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user } = authContext;

  return (
    user && (
      <Grid
        // main Grid of all the section
        sx={{
          alignItems: "start",
          p: 2,
        }}
      >
        <Typography variant="h6" color="white" fontSize={40} marginRight={2}>
          Gaming Preferences
        </Typography>
        <ThemeProvider theme={theme}>
          <Grid sx={{ marginTop: 4, width: "50%" }}>
            <Box
              color={theme.palette.text.primary}
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
                selectedPlatforms={user.preferences?.platform}
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
        </ThemeProvider>
      </Grid>
    )
  );
};

export default EditGamingPreferencesPage;
