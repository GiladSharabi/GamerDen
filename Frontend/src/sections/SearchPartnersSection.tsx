import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import PreferencesSection from "./PreferencesSection";
import Loading from "../components/Loading";
import { UserPreferences } from "../api/types";

type Props = {
  buttonLabel: string;
  onSubmitClick: (userPreferences: UserPreferences) => void;
  userPref: UserPreferences;
};

const SearchPartnersSection = ({ buttonLabel, onSubmitClick, userPref }: Props) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Loading />;
  }

  return (
    <PreferencesSection
      buttonLabel={buttonLabel}
      onSubmitClick={onSubmitClick}
      userPref={userPref}
    />
  );
};

export default SearchPartnersSection;
