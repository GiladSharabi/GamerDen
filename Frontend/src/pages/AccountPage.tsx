import GamingPreferencesSection from "../components/GamingPreferencesSection";
import PersonalDetailsSection from "../components/PersonalDetailsSection";

const AccountPage = () => {
  return (
    <div>
      <div className="mb-5">
        <PersonalDetailsSection />
      </div>
      <div>
        <GamingPreferencesSection />
      </div>
    </div>
  );
};

export default AccountPage;
