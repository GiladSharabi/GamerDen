import { Grid } from "@mui/material";
import EditPersonalDetailsSection from "../sections/EditPersonalDetailsSection";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useState } from "react";
import { User } from "../api/types";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../api/api.endpoints";
import Loading from "../components/Loading";

const EditPersonalDetailsPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState<string>("");

  if (!authContext) {
    return <Loading />
  }

  const { user, setUser } = authContext;

  const handleSaveClick = async (updatedUser: User) => {
    try {
      const result = await updateUser(updatedUser);
      if (result.user) {
        setUser(result.user);
        navigate("/account");
      } else if (result.emailError) {
        setEmailError("Email already exists.");
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="start"
      spacing={2}
      sx={{ p: 2 }}
    >
      <EditPersonalDetailsSection
        user={user}
        buttonLabel="Save"
        onSaveClick={handleSaveClick}
        emailError={emailError}
      />
    </Grid>
  );
};

export default EditPersonalDetailsPage;
