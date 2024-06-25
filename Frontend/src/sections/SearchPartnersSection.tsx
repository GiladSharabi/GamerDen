import { Box, Grid, Button, ThemeProvider } from "@mui/material";
import GameSelector from "../components/PreferencesComponents/GameSelector";
import theme from "../components/Theme";
import { useState, useContext, useEffect } from "react";
import {
  Gender,
  UserPreferences,
  Game,
  Platform,
  Region,
  NullUserPreferences,
} from "../api/types";
import UsePreferencesSelector from "../components/PreferencesComponents/UsePreferencesSelector";
import PlatformSelector from "../components/PreferencesComponents/PlatformSelector";
import VoiceSelector from "../components/PreferencesComponents/VoiceSelector";
import PreferedGenderSelector from "../components/PreferencesComponents/PreferedGenderSelector";
import RegionSelector from "../components/PreferencesComponents/RegionSelector";
import AgeRangeSelector from "../components/PreferencesComponents/AgeRangeSelector";
import { AuthContext } from "../context/AuthProvider";

type Props = {
  buttonLabel: string;
  onSubmitClick: (userPreferences: UserPreferences) => void;
  userPref: UserPreferences;
};

const SearchPartnersSection = ({
  buttonLabel,
  onSubmitClick,
  userPref,
}: Props) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const [tempPreferences, setTempPreferences] =
    useState<UserPreferences>(userPref);

  const [useGamingPref, setUseGamingPres] = useState<boolean>(true);

  const handleGamesChange = (newGame: Game) => {
    setTempPreferences((prev) => ({
      ...prev,
      games: prev.games?.some((game) => game.id === newGame.id)
        ? prev.games?.filter((game) => game.id !== newGame.id) ?? []
        : [...(prev.games ?? []), newGame],
    }));
  };

  const handleUseGamingPrefClick = () => {
    setUseGamingPres(!useGamingPref);
  };

  useEffect(() => {
    if (useGamingPref === true) {
      setTempPreferences(userPref);
    } else {
      setTempPreferences(NullUserPreferences);
    }
  }, [useGamingPref]);

  const handleVoiceClick = () => {
    setTempPreferences((prev) => ({
      ...prev,
      voice: !prev.voice,
    }));
  };

  const handlePlatformChange = (
    event: React.MouseEvent<HTMLElement>,
    newPlatform: Platform[]
  ) => {
    setTempPreferences((prev) => ({
      ...prev,
      platform: newPlatform,
    }));
  };

  const handleTeammatePlatformChange = (
    event: React.MouseEvent<HTMLElement>,
    newPlatform: Platform[]
  ) => {
    setTempPreferences((prev) => ({
      ...prev,
      teammate_platform: newPlatform,
    }));
  };

  const handleGenderChange = (gender: Gender) => {
    setTempPreferences((prev) => ({
      ...prev,
      preferred_gender: gender,
    }));
  };

  const handleRegionChange = (selectedRegion: Region) => {
    setTempPreferences((prev) => ({
      ...prev,
      region: selectedRegion,
    }));
  };

  const handleAgeRangeChange = (newRange: number[]) => {
    setTempPreferences((prevState) => ({
      ...prevState,
      min_age: newRange[0],
      max_age: newRange[1],
    }));
  };

  const handleButtonClick = () => {
    onSubmitClick(tempPreferences);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container className="flex justify-center mt-10 ml-5">
        <Box
          bgcolor="background.default"
          p={2}
          borderRadius={4}
          display="flex flex-column"
          flexDirection="column"
          sx={{ width: "600px" }}
        >
          <UsePreferencesSelector
            isUse={useGamingPref}
            onChange={handleUseGamingPrefClick}
          />
          <GameSelector
            selectedGames={tempPreferences.games}
            onChange={handleGamesChange}
          />
          <PlatformSelector
            label="Select Platform"
            selectedPlatforms={tempPreferences.platform}
            onChange={handlePlatformChange}
          />
          <RegionSelector
            region={tempPreferences.region}
            onChange={handleRegionChange}
          />
          <PreferedGenderSelector
            selectedGender={tempPreferences.preferred_gender}
            onChange={handleGenderChange}
          />
          <PlatformSelector
            label="Select teammate Platform"
            selectedPlatforms={tempPreferences.teammate_platform}
            onChange={handleTeammatePlatformChange}
          />
          <AgeRangeSelector
            useUserRange={useGamingPref}
            min_age={tempPreferences.min_age}
            max_age={tempPreferences.max_age}
            onChange={handleAgeRangeChange}
          />
          <VoiceSelector
            isVoice={tempPreferences.voice}
            onChange={handleVoiceClick}
          />
          <Button
            onClick={handleButtonClick}
            variant="contained"
            size="medium"
            sx={{
              width: "wrap",
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
    </ThemeProvider>
  );
};

export default SearchPartnersSection;
