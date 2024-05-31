import GameSelector from "../components/GameSelector";
import SearchSection from "../components/SearchSection";
import UserCards from "../components/UserCards";
import MyCheckBox from "../components/MyCheckBox";
import { Box, Container, Grid } from '@mui/material';

const LoginHomePage = () => {
  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Box p={2} border={1} borderRadius={8}>
            <GameSelector />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <MyCheckBox label="Voice" />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" mt={4}>
        <UserCards />
      </Box>
    </Container>
  );
};

export default LoginHomePage;
