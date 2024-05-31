import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import DateSelector, { DateOfBirth } from "../components/DateSelector";
import CountrySelector from "../components/CountrySelector";
import GenderSelector from "../components/GenderSelector";
import { Gender } from "../api/types";
import LanguagesSelector from "../components/LanguagesSelector";
import { useState, useEffect } from "react";
import Bio from "../components/Bio";
import { User } from "../api/types"

type formUser = {
  user: User,
  confirmPassword: string,
}

type FormErrors = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  dob?: string;
  country?: string;
  gender?: string;
  languages?: string;
  bio?: string;
};

const SignUp = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<formUser>({
    user: {

      username: "",
      email: "",
      password: "",
      dob: new Date(),
      country: "",
      gender: Gender.None,
      languages: [],
      bio: "",
    },
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    // console.log("the name: " + name);
    setFormValues({ ...formValues, [name]: value });
  };
  const handleDateChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      dob: { ...prevValues.user.dob, [name]: parseInt(value) },
    }));
  };
  const handleLanguageChange = (languages: string[]) => {
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      user: {
        ...prevFormValues.user,
        languages: languages
      }
    }));
  };

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);

  const handleClickRegister = (e: any) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (!formErrors) {
      navigate("/login");
    }
  };

  // useEffect(() => {}, [formErrors]);

  const validate = (values: formUser): FormErrors => {
    const errors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
    if (!values.user.username) {
      errors.username = "Username is required!";
    }
    if (!values.user.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.user.email)) {
      errors.email = "This is not a valid email";
    }
    if (!values.user.password) {
      errors.password = "Password is required!";
    } else if (!passwordRegex.test(values.user.password)) {
      errors.password =
        "Password must be 8-12 characters long and contain at least one letter and one number";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required!";
    } else if (values.user.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords must match!";
    }
    const ageDifference = new Date().getFullYear() - values.user.dob.getFullYear();
    if (ageDifference < 18) {
      errors.dob = "User must be atleast 18 years old";
    }
    if (!values.user.country) {
      errors.country = "Please select a country";
    }
    if (values.user.gender === Gender.None) {
      errors.gender = "Please select a gender";
    }
    if (values.user.languages.length === 0) {
      errors.languages = "Please select at least one language";
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
            // action="#"
            onSubmit={handleClickRegister}
          >
            <FormField
              htmlFor="username"
              text="Username"
              type="text"
              id="username"
              value={formValues.user.username}
              onFieldChange={handleChange}
              errorMsg={formErrors.username}
            />
            <FormField
              htmlFor="email"
              text="Email"
              type="text"
              id="email"
              placeholder="example@example.com"
              value={formValues.user.email}
              onFieldChange={handleChange}
              errorMsg={formErrors.email}
            />
            <FormField
              htmlFor="password"
              text="Password"
              type="password"
              id="password"
              placeholder="••••••••"
              value={formValues.user.password}
              onFieldChange={handleChange}
              errorMsg={formErrors.password}
            />
            <FormField
              htmlFor="confirmPassword"
              text="Confirm Password"
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              value={formValues.confirmPassword}
              onFieldChange={handleChange}
              errorMsg={formErrors.confirmPassword}
            />
            <div>
              <label className="block mb-2 font-bold text-black">
                Date Of Birth
              </label>
              <DateSelector
                onDateChange={handleDateChange}
                errorMsg={formErrors.dob}
              />
            </div>

            <div>
              <label className="block mb-2 font-bold text-black">Country</label>
              <CountrySelector
                onCountryChange={handleChange}
                errorMsg={formErrors.country}
              />
            </div>
            <div>
              <div>
                <label className="block font-bold text-black">Gender</label>
                <GenderSelector
                  onGenderChange={handleChange}
                  errorMsg={formErrors.gender}
                />
              </div>

              <div>
                <label className="mb-2 block font-bold text-black">
                  Languages
                </label>
                <LanguagesSelector
                  onLanguagesListChange={handleLanguageChange}
                  errorMsg={formErrors.languages}
                />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block mb-2 text-black  font-bold"
                >
                  Bio (Optional):
                </label>
                <Bio onBioChange={handleChange} value={formValues.user.bio}></Bio>
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
