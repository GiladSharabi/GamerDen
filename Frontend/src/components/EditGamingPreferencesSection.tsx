import { Box, Grid, Button, ThemeProvider } from "@mui/material";
import GameSelector from "../components/PreferencesComponents/GameSelector";
import theme from "../components/Theme";
import { useState, useEffect } from "react";
import { Gender, UserPreferences } from "../api/types";
import PlatformSelector from "../components/PreferencesComponents/PlatformSelector";
import VoiceSelector from "../components/PreferencesComponents/VoiceSelector";
import PreferedGenderSelector from "../components/PreferencesComponents/PreferedGenderSelector";
import RegionSelector from "../components/PreferencesComponents/RegionSelector";
import age_rangeSelector from "../components/PreferencesComponents/age_rangeSelector";
import { Platform, Game } from "../api/types";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

type props = {
  buttonLabel: string;
  onSubmitClick: () => void;
  // userPref: UserPreferences | undefined;
  // setPref: (pref: UserPreferences) => void;
};

const EditGamingPreferencesSection = ({
  buttonLabel,
  onSubmitClick,
}: // userPref,
// setPref,
props) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <div>Loading...</div>;
  }
  const { user } = authContext;
  console.log("the pref: " + user.preferences);
  const [tempPref, setTempPref] = useState<UserPreferences>(user.preferences);
  useEffect(() => {
    if (tempPref !== undefined) {
      console.log(tempPref);
    }
  }, [tempPref]);

  const handleGamesChange = (newGame: Game) => {
    // if (newGame) {
    setTempPref((prev) => {
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
    // }
  };

  const handleVoiceClick = () => {
    setTempPref((prev) => ({
      ...prev,
      voice: !prev.voice,
    }));
  };
  const handlePlatformChange = (
    event: React.MouseEvent<HTMLElement>,
    newPlatform: Platform[]
  ) => {
    setTempPref((prev) => ({
      ...prev,
      platform: newPlatform,
    }));
  };
  const handleteammate_platformChange = (
    event: React.MouseEvent<HTMLElement>,
    newPlatform: Platform[]
  ) => {
    setTempPref((prev) => ({
      ...prev,
      teammate_platform: newPlatform,
    }));
  };

  const handleGenderChange = (gender: Gender) => {
    setTempPref((prev) => ({
      ...prev,
      preferred_gender: gender,
    }));
  };
  const handleRegionChange = (selectedRegion: string) => {
    setTempPref((prev) => ({
      ...prev,
      region: selectedRegion,
    }));
  };

  const handleage_rangeChange = (newValue: number[]) => {
    if (Array.isArray(newValue)) {
      setTempPref((prev) => ({
        ...prev,
        age_range: newValue,
      }));
    }
  };

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
              selectedGames={tempPref.games}
              onChange={handleGamesChange}
            />
            <PlatformSelector
              label="Select Platform"
              selectedPlatforms={
                tempPref && tempPref.platform ? tempPref.platform : []
              }
              onChange={handlePlatformChange}
            />
            <RegionSelector
              region={tempPref && tempPref.region ? tempPref.region : ""}
              onChange={handleRegionChange}
              label="Select Region"
            />
            <PreferedGenderSelector
              label="Which gender do you prefer to play with?"
              selectedGender={
                tempPref && tempPref.preferred_gender
                  ? tempPref.preferred_gender
                  : Gender.None
              }
              onChange={handleGenderChange}
            />
            <PlatformSelector
              label="Select teammate Platform"
              selectedPlatforms={
                tempPref && tempPref.teammate_platform
                  ? tempPref.teammate_platform
                  : []
              }
              onChange={handleteammate_platformChange}
            />
            <age_rangeSelector
              label="Between what ages are your ideal teammates?"
              minAge={
                tempPref && tempPref.age_range ? tempPref.age_range[0] : 18
              }
              maxAge={
                tempPref && tempPref.age_range ? tempPref.age_range[1] : 100
              }
              age_range={tempPref.age_range as number[]}
              onChange={handleage_rangeChange}
            />
            <VoiceSelector
              isVoice={tempPref && tempPref.voice ? tempPref?.voice : false}
              onChange={handleVoiceClick}
            />
            <Button
              onClick={onSubmitClick}
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
              {buttonLabel}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default EditGamingPreferencesSection;
