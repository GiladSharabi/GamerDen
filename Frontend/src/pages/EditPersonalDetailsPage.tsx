import { Grid } from "@mui/material";
import EditPersonalDetailsSection from "../sections/EditPersonalDetailsSection";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserWithImage } from "../api/api.endpoints";
import Loading from "../components/Loading";

const EditPersonalDetailsPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState<string>("");

  if (!authContext) {
    return <Loading />;
  }

  const { user, setUser } = authContext;

  const handleSaveClick = async (formData: FormData) => {
    const result = await updateUserWithImage(formData);
    if (result.user) {
      setUser(result.user);
      navigate("/account");
    } else if (result.emailError) {
      setEmailError("Email already exists.");
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="start" sx={{ p: 2 }}>
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
