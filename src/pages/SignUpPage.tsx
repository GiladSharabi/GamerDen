import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import DateSelector from "../components/DateSelector";
import CountrySelector from "../components/CountrySelector";
import GenderSelector, { Gender } from "../components/GenderSelector";
import { useState } from "react";

const SignUp = () => {
  // const [formData, setFormData] = useState({
  //   userName: "",
  //   email: "",
  //   password: "",
  //   passwordConfirm: "",
  //   day: 0,
  //   month: 0,
  //   year: 0,
  //   gender: Gender.None,
  //   country: "",
  // });

  const navigate = useNavigate();
  const handleClickRegister = (e: any) => {
    e.stopPropogation();
    navigate("/");
  };

  return (
    <section className="bg-black dark:bg-gray-900 flex items-center justify-center h-screen">
      <div className="w-full bg-gray-200 rounded-lg shadow dark:border md:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-white">
            Sign Up
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
              type="email"
              id="email"
              placeholder="name@company.com"
            />
            <FormField
              htmlFor="password"
              text="Password"
              type="password"
              id="password"
              placeholder="••••••••"
            />
            <FormField
              htmlFor="passwordConfirm"
              text="Confirm Password"
              type="password"
              id="passwordConfirm"
              placeholder="••••••••"
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
              <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                Gender
              </label>
              <GenderSelector />
            </div>

            <button
              onClick={handleClickRegister}
              type="submit"
              className="w-full text-black bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
