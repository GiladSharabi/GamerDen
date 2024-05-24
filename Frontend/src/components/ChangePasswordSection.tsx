import FormField from "./FormField";
import SaveButton from "./SaveButton";

const ChangePasswordSection = () => {
  return (
    <section className="flex items-start justify-end mr-5">
      <div className="mb-10 w-full bg-gray-200 rounded-lg shadow md:max-w-4xl xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
            Change Password:
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <FormField
              htmlFor="currentPassword"
              text="Current Password"
              type="password"
              id="currentPassword"
              placeholder="••••••••"
            />
            <FormField
              htmlFor="newPassword"
              text="New Password"
              type="password"
              id="newPassword"
              placeholder="••••••••"
            />
            <FormField
              htmlFor="passwordConfirm"
              text="Confirm Password"
              type="password"
              id="passwordConfirm"
              placeholder="••••••••"
            />
            <SaveButton></SaveButton>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePasswordSection;
