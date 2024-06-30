import { Box, Grid, Typography, Button, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdModeEditOutline, MdMic, MdMicOff } from "react-icons/md";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import Loading from "../components/Loading";
import theme from "../components/Theme";
import MyDivider from "../components/MyDivider";
import GamesList from "../components/GamesList";
import { FaComputer, FaXbox, FaPlaystation } from "react-icons/fa6";
import { Platform, Gender } from "../api/types";
import { IoMdMale, IoMdFemale } from "react-icons/io";

type Props = {
  isEditable: boolean;
};

const GamingPreferencesSection = ({ isEditable }: Props) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Loading />;
  }

  const { user } = authContext;
  const { preferences } = user;
  const navigate = useNavigate();

  const handleEditGamingPreferences = () => {
    navigate("/edit-gaming-preferences");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12} sm={6} md={4} lg={3} marginBottom={10}>
        <Box
          className="mx-auto shadow-lg p-4 mb-1"
          sx={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(5px)",
            borderRadius: 10,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
            width: "600px",
          }}
        >
          <Typography
            variant="h5"
            color="primary"
            className="text-lg text-center mb-2"
          >
            My Gaming Preferences
          </Typography>
          <MyDivider color="black" />
          <Box p={2}>
            <Typography fontWeight="bold">Games:</Typography>
            <GamesList games={preferences.games} />
          </Box>
          <MyDivider color="black" />
          <Box display="flex" alignItems="center" p={2}>
            <Typography fontWeight="bold" flexShrink={0} mr={1}>
              Platform:
            </Typography>
            {preferences.platform.map((platform) => (
              <>
                {platform === Platform.PC && (
                  <FaComputer className="mr-3 size-7" />
                )}
                {platform === Platform.Playstation && (
                  <FaPlaystation className="mr-3 size-7" />
                )}
                {platform === Platform.Xbox && (
                  <FaXbox className="mr-3 size-7" />
                )}
              </>
            ))}
          </Box>
          <MyDivider color="black" />
          <Box display="flex" alignItems="center" p={2}>
            <Typography fontWeight="bold" flexShrink={0} mr={1}>
              Region:
            </Typography>
            <Typography>{preferences.region}</Typography>
          </Box>
          <MyDivider color="black" />
          <Box display="flex" alignItems="center" p={2}>
            <Typography fontWeight="bold" flexShrink={0} mr={1}>
              Preferred Gender:
            </Typography>
            {preferences.preferred_gender === Gender.Male && (
              <IoMdMale className="size-6 text-blue-700" />
            )}
            {preferences.preferred_gender === Gender.Female && (
              <IoMdFemale className="size-6 text-pink-400" />
            )}
            {preferences.preferred_gender === Gender.Both && (
              <>
                <IoMdMale className="size-6 text-blue-700 mr-1" />
                <IoMdFemale className="size-6 text-pink-400" />
              </>
            )}
          </Box>
          <MyDivider color="black" />
          <Box display="flex" alignItems="center" p={2}>
            <Typography fontWeight="bold" flexShrink={0} mr={1}>
              Teammate Platform:
            </Typography>
            {preferences.teammate_platform.map((platform) => (
              <>
                {platform === Platform.PC && (
                  <FaComputer className="mr-3 size-7" />
                )}
                {platform === Platform.Playstation && (
                  <FaPlaystation className="mr-3 size-7" />
                )}
                {platform === Platform.Xbox && (
                  <FaXbox className="mr-3 size-7" />
                )}
              </>
            ))}
          </Box>
          <MyDivider color="black" />
          <Box display="flex" alignItems="center" p={2}>
            <Typography fontWeight="bold" flexShrink={0} mr={1}>
              Voice:
            </Typography>
            {preferences.voice ? (
              <MdMic size={25} className="text-green-500" />
            ) : (
              <MdMicOff size={25} className="text-red-500" />
            )}
          </Box>
          <MyDivider color="black" />
          <Box display="flex" alignItems="center" p={2}>
            <Typography fontWeight="bold" flexShrink={0} mr={1}>
              Age Range:
            </Typography>
            <Typography>{`${preferences.min_age} - ${preferences.max_age}`}</Typography>
          </Box>
          <MyDivider color="black" />
          {isEditable && (
            <Grid container justifyContent="center">
              <Button
                startIcon={<MdModeEditOutline />}
                variant="contained"
                color="primary"
                size="medium"
                onClick={handleEditGamingPreferences}
                className="mt-4"
              >
                Edit Preferences
              </Button>
            </Grid>
          )}
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default GamingPreferencesSection;
