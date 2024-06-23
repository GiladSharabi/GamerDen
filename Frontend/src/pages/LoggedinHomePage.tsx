import { updateUser } from "../api/api.endpoints";
import { NullUser, UserPreferences } from "../api/types";
import SearchPartnersSection from "../sections/SearchPartnersSection";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import UserCards from "../components/UserCards";

const LoggedinHomePage = () => {
  const authContext = useContext(AuthContext);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (tempPreferences: UserPreferences) => {
    // search in DB
  };

  return (
    <>
      {" "}
      <SearchPartnersSection
        buttonLabel="Search"
        onSubmitClick={handleSubmit}
        userPref={user.preferences}
      />
      <UserCards />
    </>
  );
};

export default LoggedinHomePage;
