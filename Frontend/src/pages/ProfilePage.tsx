import { Grid } from "@mui/material";
import GamingPreferencesSection from "../sections/GamingPreferencesSection";
import PersonalDetailsSection from "../sections/PersonalDetailsSection";
import { useNavigate, useParams } from 'react-router-dom';
import { getUserByUsername } from "../api/api.endpoints";
import { useEffect, useState } from "react";
import { NullUser } from "../api/types";
import Loading from "../components/Loading";
import NotFoundPage from "./NotFoundPage";

const ProfilePage = () => {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(NullUser);
  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (username) {
        const result = await getUserByUsername(username);
        if (result.existError) {
          setUserNotFound(true);
        } else {
          setProfileUser(result.user ? result.user : NullUser);
        }
      }
    };
    fetchUser();
  }, []);

  if (userNotFound) {
    return <NotFoundPage />;
  }

  if (profileUser === NullUser) {
    return <Loading />;
  }

  return (
    <Grid>
      <PersonalDetailsSection />
      <GamingPreferencesSection />
    </Grid>
  );
};

export default ProfilePage;
