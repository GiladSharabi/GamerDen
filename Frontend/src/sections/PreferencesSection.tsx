import { Box, Grid, Button } from "@mui/material";
import GameSelector from "../components/PreferencesComponents/GameSelector";
import { useState, useEffect } from "react";
import { UserPreferences, Game, NullUserPreferences } from "../api/types";
import PlatformSelector from "../components/PreferencesComponents/PlatformSelector";
import VoiceSelector from "../components/PreferencesComponents/VoiceSelector";
import PreferredGenderSelector from "../components/PreferencesComponents/PreferredGenderSelector";
import RegionSelector from "../components/PreferencesComponents/RegionSelector";
import AgeRangeSelector from "../components/PreferencesComponents/AgeRangeSelector";
import UsePreferencesSelector from "../components/PreferencesComponents/UsePreferencesSelector";

type Props = {
  buttonLabel: string;
  onSubmitClick: (userPreferences: UserPreferences) => void;
  userPref: UserPreferences;
  useExistingPreferences?: boolean;
  useExistingButton?: boolean;
};

const PreferencesSection = ({
  buttonLabel,
  onSubmitClick,
  userPref,
  useExistingPreferences = true,
  useExistingButton = true,
}: Props) => {
  const [tempPreferences, setTempPreferences] =
    useState<UserPreferences>(userPref);

  const [useGamingPreferences, setUseGamingPreferences] = useState<boolean>(
    useExistingPreferences
  );

  const handleUseGamingPrefClick = () => {
    setUseGamingPreferences(!useGamingPreferences);
  };

  useEffect(() => {
    if (useGamingPreferences) {
      setTempPreferences(userPref);
    } else {
      setTempPreferences(NullUserPreferences);
    }
  }, [useGamingPreferences]);

  const handleGamesChange = (newGame: Game) => {
    setTempPreferences((prev) => ({
      ...prev,
      games: prev.games?.some((game) => game.id === newGame.id)
        ? prev.games?.filter((game) => game.id !== newGame.id) ?? []
        : [...(prev.games ?? []), newGame],
    }));
  };

  const handleVoiceClick = () => {
    setTempPreferences((prev) => ({
      ...prev,
      voice: !prev.voice,
    }));
  };

  const handlePreferenceChange = (key: keyof UserPreferences, value: any) => {
    setTempPreferences((prev) => ({
      ...prev,
      [key]: value,
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
      <Grid container className="flex justify-center mt-10 mb-20">
        <Box
          sx={{
            p: 6,
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(5px)",
            borderRadius: 4,
            width: "600px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
          }}
        >
          {useExistingButton && (
            <UsePreferencesSelector
              isUse={useGamingPreferences}
              onChange={handleUseGamingPrefClick}
            />
          )}
          <GameSelector
            selectedGames={tempPreferences.games}
            onChange={handleGamesChange}
          />
          <PlatformSelector
            label="Select Platform"
            selectedPlatforms={tempPreferences.platform}
            onChange={(event, newPlatform) =>
              handlePreferenceChange("platform", newPlatform)
            }
          />
          <RegionSelector
            region={tempPreferences.region}
            onChange={(selectedRegion) =>
              handlePreferenceChange("region", selectedRegion)
            }
          />
          <PreferredGenderSelector
            selectedGender={tempPreferences.preferred_gender}
            onChange={(gender) =>
              handlePreferenceChange("preferred_gender", gender)
            }
          />

          <PlatformSelector
            label="Select teammate Platforms"
            selectedPlatforms={tempPreferences.teammate_platform}
            onChange={(event, newPlatform) =>
              handlePreferenceChange("teammate_platform", newPlatform)
            }
          />
          <AgeRangeSelector
            useUserRange={useExistingPreferences}
            min_age={tempPreferences.min_age}
            max_age={tempPreferences.max_age}
            onChange={handleAgeRangeChange}
          />
          <VoiceSelector
            isVoice={tempPreferences.voice}
            onChange={handleVoiceClick}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              onClick={handleButtonClick}
              variant="contained"
              size="medium"
            >
              {buttonLabel}
            </Button>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default PreferencesSection;
