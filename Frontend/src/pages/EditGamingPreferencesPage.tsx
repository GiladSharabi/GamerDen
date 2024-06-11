import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
} from "@mui/material";
import { IoSearch } from "react-icons/io5";
import GameSelector from "../components/GameSelector";
import PlatformSelector from "../components/PlatformSelector";
import RegionSelector from "../components/RegionSelector";
import SoloOrGroupSelector from "../components/SoloOrGroupSelector";
import PreferedGenderSelector from "../components/PreferedGenderSelector";
import AgeRangeSelector from "../components/AgeRangeSelector";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

const EditGamingPreferencesPage = () => {
  const navigate = useNavigate();

  const handleSaveClick = () => { };
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user } = authContext;

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
              onChange={(event, newPlatform: Platform) =>
                handleClick("platform", newPlatform)
              }
            />
            <RegionSelector
              region={userPref.region ? userPref.region : ""}
              onChange={(event, newRegion: string) =>
                handleClick("region", newRegion)
              }
              label="Select Region"
            />
            <SoloOrGroupSelector
              label="Are you searching alone or with other group?"
              soloOrGroup={
                userPref.soloOrGroup ? userPref.soloOrGroup : SoloOrGroup.None
              }
              onChange={(event, newSoloOrGroup: SoloOrGroup) =>
                handleClick("soloOrGroup", newSoloOrGroup)
              }
            />
            <PreferedGenderSelector
              label="Which gender do you prefer to play with?"
              selectedGender={
                userPref.prefGender ? userPref.prefGender : Gender.None
              }
              onChange={(event, newGender: Gender) =>
                handleClick("prefGender", newGender)
              }
            />
            <PlatformSelector
              label="Select teammate Platform"
              selectedPlatforms={
                userPref.teammatePlatform ? userPref.teammatePlatform : []
              }
              onChange={(event, newTeammatePlatform: Platform[]) =>
                handleClick("teammatePlatform", newTeammatePlatform)
              }
            />
            <AgeRangeSelector
              label="Between what ages are your ideal teammates?"
              minAge={userPref.ageRange ? userPref.ageRange[0] : 18}
              maxAge={userPref.ageRange ? userPref.ageRange[1] : 90}
              onChange={(min: number, max: number) =>
                handleClick("ageRange", [min, max])
              }
            />
            <VoiceSelector
              isVoice={userPref.voice ? userPref.voice : undefined}
              onChange={(event, isVoice: boolean) =>
                handleClick("voice", isVoice)
              }
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
