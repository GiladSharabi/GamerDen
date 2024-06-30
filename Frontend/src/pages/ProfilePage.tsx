import { Grid } from "@mui/material";
import GamingPreferencesSection from "../sections/GamingPreferencesSection";
import PersonalDetailsSection from "../sections/PersonalDetailsSection";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../api/api.endpoints";
import { useEffect, useState } from "react";
import { NullUser, User } from "../api/types";
import Loading from "../components/Loading";
import NotFoundPage from "./NotFoundPage";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState<User>(NullUser);
  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (username) {
        const result = await getUserByUsername(username);
        if (result.existError) {
          setUserNotFound(true);
        } else if (result.accessToken) {
          const user: User = jwtDecode(result.accessToken);
          setProfileUser(user);
        }
      }
    };
    fetchUser();
  }, [profileUser]);
  useEffect(() => {
    console.log("not found: ", userNotFound);
  }, [userNotFound]);
  if (userNotFound) {
    return <NotFoundPage />;
  }

  // if (profileUser === NullUser) {
  //   return <Loading />;
  // }

  return profileUser === NullUser ? (
    <Loading />
  ) : (
    <Grid>
      <PersonalDetailsSection isEditable={false} />
      <GamingPreferencesSection isEditable={false} />
    </Grid>
  );
};

export default ProfilePage;
