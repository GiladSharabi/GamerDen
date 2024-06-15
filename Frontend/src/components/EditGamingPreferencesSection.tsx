import { Box, Grid, Button, ThemeProvider } from "@mui/material";
import GameSelector from "../components/PreferencesComponents/GameSelector";
import theme from "../components/Theme";
import { useState, useEffect } from "react";
import { Gender, UserPreferences } from "../api/types";
import PlatformSelector from "../components/PreferencesComponents/PlatformSelector";
import VoiceSelector from "../components/PreferencesComponents/VoiceSelector";
import PreferedGenderSelector from "../components/PreferencesComponents/PreferedGenderSelector";
import RegionSelector from "../components/PreferencesComponents/RegionSelector";
import AgeRangeSelector from "../components/PreferencesComponents/AgeRangeSelector";
import { Platform, Game } from "../api/types";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

const EditGamingPreferencesSection = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <div>Loading...</div>;
  }
  const { user } = authContext;
  const [userPref, setUserPref] = useState<UserPreferences>({
    voice: false,
    platform: [],
    teammatePlatform: [],
    ageRange: [18, 100],
  });
  useEffect(() => {
    if (userPref !== undefined) {
      console.log(userPref);
    }
  }, [userPref]);

  const handleGamesChange = (newGame: Game | undefined) => {
    if (newGame) {
      setUserPref((prev) => {
        const gameExists = prev.games?.some((game) => game.id === newGame.id);

        if (gameExists) {
          // remove the game from the list

          return {
            ...prev,
            games: prev.games?.filter((game) => game.id !== newGame.id) ?? [],
          };
        } else {
          // add the game to the list
          return {
            ...prev,
            games: [...(prev.games ?? []), newGame],
          };
        }
      });
    }
  };

  const handleVoiceClick = () => {
    setUserPref((prev) => ({
      ...prev,
      voice: !prev.voice,
    }));
  };
  const handlePlatformChange = (
    event: React.MouseEvent<HTMLElement>,
    newPlatform: Platform[]
  ) => {
    setUserPref((prev) => ({
      ...prev,
      platform: newPlatform,
    }));
  };
  const handleTeammatePlatformChange = (
    event: React.MouseEvent<HTMLElement>,
    newPlatform: Platform[]
  ) => {
    setUserPref((prev) => ({
      ...prev,
      teammatePlatform: newPlatform,
    }));
  };

  const handleGenderChange = (gender: Gender) => {
    setUserPref((prev) => ({
      ...prev,
      prefGender: gender,
    }));
  };
  const handleRegionChange = (selectedRegion: string) => {
    setUserPref((prev) => ({
      ...prev,
      region: selectedRegion,
    }));
  };

  const handleAgeRangeChange = (newValue: number[]) => {
    if (Array.isArray(newValue)) {
      setUserPref((prev) => ({
        ...prev,
        ageRange: newValue,
      }));
    }
  };
  const handleSaveClick = () => {};

  return (
    <ThemeProvider theme={theme}>
      <Grid container className="flex justify-start mt-10 ml-5">
        <Grid>
          <Box
            bgcolor="background.default"
            p={2}
            borderRadius={4}
            display="flex flex-column"
            flexDirection="column"
          >
            {/* the Box that hold all fields */}
            <GameSelector
              selectedGames={userPref.games}
              onChange={handleGamesChange}
            />
            <PlatformSelector
              label="Select Platform"
              selectedPlatforms={
                userPref && userPref.platform ? userPref.platform : []
              }
              onChange={handlePlatformChange}
            />
            <RegionSelector
              region={userPref && userPref.region ? userPref.region : ""}
              onChange={handleRegionChange}
              label="Select Region"
            />
            <PreferedGenderSelector
              label="Which gender do you prefer to play with?"
              selectedGender={
                userPref && userPref.prefGender
                  ? userPref.prefGender
                  : Gender.None
              }
              onChange={handleGenderChange}
            />
            <PlatformSelector
              label="Select teammate Platform"
              selectedPlatforms={
                userPref && userPref.teammatePlatform
                  ? userPref.teammatePlatform
                  : []
              }
              onChange={handleTeammatePlatformChange}
            />
            <AgeRangeSelector
              label="Between what ages are your ideal teammates?"
              minAge={userPref && userPref.ageRange ? userPref.ageRange[0] : 18}
              maxAge={
                userPref && userPref.ageRange ? userPref.ageRange[1] : 100
              }
              ageRange={userPref.ageRange as number[]}
              onChange={handleAgeRangeChange}
            />
            <VoiceSelector
              isVoice={userPref && userPref.voice ? userPref?.voice : false}
              onChange={handleVoiceClick}
            />
            <Button
              onClick={handleSaveClick}
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
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default EditGamingPreferencesSection;
