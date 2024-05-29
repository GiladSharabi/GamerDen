import FormField from "./FormField";
import DateSelector from "./DateSelector";
import CountrySelector from "./CountrySelector";
import GenderSelector from "./GenderSelector";
import SaveButton from "./SaveButton";
import LanguagesSelector from "./LanguagesSelector";
import { FormValues } from "../pages/SignUpPage";
import { useState } from "react";
import { Gender } from "../api/types";

const EditPersonalDetailsSection = ({}: FormValues) => {
  const [formValues, setFormValues] = useState<FormValues>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: { day: 0, month: 0, year: 0 },
    country: "",
    gender: Gender.None,
    languages: [],
  });

  return (
    <section className="flex items-center justify-start ml-5">
      <div className="mb-5 w-full bg-gray-200 rounded-lg shadow md:max-w-4xl xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
            Edit Your Personal Details:
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <FormField
              htmlFor="username"
              text="Username"
              type="text"
              id="username"
            />
            <FormField
              htmlFor="email"
              text="Email"
              type="text"
              id="email"
              placeholder="example@example.com"
            />

            <div>
              <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                Date Of Birth
              </label>
              <DateSelector />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                Country
              </label>
              <CountrySelector />
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Gender:
              </label>
              <GenderSelector />

              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Languages
                </label>
                <LanguagesSelector />
              </div>
            </div>
            <SaveButton></SaveButton>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditPersonalDetailsSection;
