import { Grid } from "@mui/material";
import EditPersonalDetailsSection from "../sections/EditPersonalDetailsSection";
import { AuthContext } from "../context/AuthProvider";
import { useState, useContext, useEffect } from "react";
import { NullUser, UserPreferences, User } from "../api/types";
import { updateUser } from "../api/api.endpoints";
import { useNavigate } from "react-router-dom";
const EditPersonalDetailsPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user, setUser } = authContext;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user !== NullUser) {
      setIsLoading(false);
    }
  }, [user]);

  const handleSaveClick = (updatedUser: User) => {
    setUser(updatedUser);
    updateUser(updatedUser);
    navigate("/account");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Grid
      sx={{
        alignItems: "start",
        p: 2,
      }}
    >
      <EditPersonalDetailsSection
        user={user}
        buttonLabel="Save"
        onSaveClick={handleSaveClick}
      />
    </Grid>
  );
};

export default EditPersonalDetailsPage;
