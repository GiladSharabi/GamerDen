import { Box, Container, Checkbox, Grid, ThemeProvider } from "@mui/material";
import GameSelector from "../components/GameSelector";
import UserCards from "../components/UserCards";
import theme from "../components/Theme";

const LoginHomePage = () => {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ marginTop: "50px" }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Box bgcolor="background.default" p={2} borderRadius={4}>
              <GameSelector />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Checkbox {...label} />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" mt={4}>
          <UserCards />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginHomePage;
