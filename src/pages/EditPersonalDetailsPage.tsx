import EditPersonalDetailsSection from "../components/EditPersonalDetailsSection";
import ChangePasswordSection from "../components/ChangePasswordSection";

const EditPersonalDetailsPage = () => {
  return (
    <div className="flex">
      <div className="w-1/2 mr-5">
        <EditPersonalDetailsSection />
      </div>
      <div className="w-1/2">
        <ChangePasswordSection />
      </div>
    </div>
  );
};

export default EditPersonalDetailsPage;
