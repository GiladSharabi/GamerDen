import { Grid } from "@mui/material";
import EditPersonalDetailsSection from "../sections/EditPersonalDetailsSection";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserWithImage } from "../api/api.endpoints";
import Loading from "../components/Loading";
import { User } from "../api/types";

const EditPersonalDetailsPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: "",
    discord: "",
    languages: "",
  });

  if (!authContext) {
    return <Loading />;
  }
  const { user, setUser } = authContext;
  const [tempUser, setTempUser] = useState<User>(user);

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple email
    const newErrors = {
      email:
        tempUser.email && emailRegex.test(tempUser.email)
          ? ""
          : "Please enter a valid email.",
      discord: tempUser.discord ? "" : "Please enter Discord username.",
      languages: tempUser.languages.length
        ? ""
        : "Please select at least 1 language.",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSaveClick = async (formData: FormData) => {
    if (validateFields()) {
      const result = await updateUserWithImage(formData);
      if (result.user) {
        setUser(result.user);
        navigate("/account");
      } else if (result.emailError) {
        setErrors((errors) => ({
          ...errors,
          email: "Email already exists." || "",
        }));
        // setEmailError("Email already exists.");
      }
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="start" sx={{ p: 2 }}>
      <EditPersonalDetailsSection
        user={tempUser}
        setUser={setTempUser}
        onSaveClick={handleSaveClick}
        errors={errors}
      />
    </Grid>
  );
};

export default EditPersonalDetailsPage;
