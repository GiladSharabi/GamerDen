import {
  Box,
  Container,
  Checkbox,
  Grid,
  ThemeProvider,
  FormControlLabel,
} from "@mui/material";
import GameSelector from "../components/GameSelector";
import UserCards from "../components/UserCards";
import theme from "../components/Theme";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import PlatformSelector from "../components/PlatformSelector";
import { searchProps } from "../api/types";
import VoiceSelector from "../components/VoiceSelector";
/*
  platform
  voice - checkbox
  solo/group
  pref gender
  region
  partner platform
  age range
*/

const LoggedinHomePage = () => {
  const [isVoice, setIsVoice] = useState<boolean>(false);
  let searchProps: searchProps;

  const handleVoiceClick = () => {
    setIsVoice(!isVoice);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ marginTop: "50px" }}>
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
              <PlatformSelector />
              <VoiceSelector isVoice={isVoice} onChange={handleVoiceClick} />
            </Box>
          </Grid>
        </Grid>
        {/* <Box display="flex" justifyContent="center" mt={4}>
          <UserCards />
        </Box> */}
      </Container>
    </ThemeProvider>
  );
};

export default LoggedinHomePage;
