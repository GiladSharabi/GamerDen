import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import DateSelector, { DateOfBirth } from "../components/DateSelector";
import CountrySelector from "../components/CountrySelector";
import GenderSelector, { Gender } from "../components/GenderSelector";
import LanguagesSelector from "../components/LanguagesSelector";
import { useState, useEffect } from "react";

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: DateOfBirth | string;
  country: string;
  gender: Gender | string;
  languages: string[];
};
type FormErrors = Partial<FormValues>;

const SignUp = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<FormValues>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: {},
    country: "",
    gender: Gender.None,
    languages: [],
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleClickRegister = (e: any) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
  };

  // useEffect(() => {}, [formErrors]);

  const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } /*else if (emailRegex.test(values.email)) {
      errors.email = "This is not a valid email";
    }*/
    if (!values.password) {
      errors.password = "Password is required!";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required!";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords must match!";
    }
    return errors;
  };

  return (
    <section className="flex items-center justify-center">
      <div className="mb-10 w-full bg-gray-200 rounded-lg shadow md:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="font-bold leading-tight tracking-tight text-black md:text-3xl">
            Sign Up
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={handleClickRegister}
          >
            <FormField
              htmlFor="username"
              text="Username"
              type="text"
              id="username"
              value={formValues.username}
              onChange={handleChange}
              errorMsg={formErrors.username}
            />
            <FormField
              htmlFor="email"
              text="Email"
              type="email"
              id="email"
              placeholder="example@example.com"
              value={formValues.email}
              onChange={handleChange}
              errorMsg={formErrors.email}
            />
            <FormField
              htmlFor="password"
              text="Password"
              type="password"
              id="password"
              placeholder="••••••••"
              value={formValues.password}
              onChange={handleChange}
              errorMsg={formErrors.password}
            />
            <FormField
              htmlFor="confirmPassword"
              text="Confirm Password"
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              value={formValues.confirmPassword}
              onChange={handleChange}
              errorMsg={formErrors.confirmPassword}
            />
            <div>
              <label className="block mb-2 text-sm font-bold text-black">
                Date Of Birth
              </label>
              <DateSelector />
            </div>

            <div>
              <label className="block mb-2 text-sm font-bold text-black">
                Country
              </label>
              <CountrySelector />
            </div>
            <div>
              <div>
                <label className="block text-sm font-bold text-black">
                  Gender
                </label>
                <GenderSelector />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-black">
                  Languages
                </label>
                <LanguagesSelector />
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-black bg-blue-600 hover:bg-blue-500  font-bold rounded-lg px-5 py-2.5 text-center"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
