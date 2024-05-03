import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import FormField from "./FormField";
import DateSelector from "./DateSelector";
import CountrySelector from "./CountrySelector";
import GenderSelector from "./GenderSelector";

const SignUp = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");

  const handleDayChange = (value: string) => {
    setDay(value);
  };

  const handleMonthChange = (value: string) => {
    setMonth(value);
  };

  const handleYearChange = (value: string) => {
    setYear(value);
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  const navigate = useNavigate();
  const handleClickRegister = () => navigate("/");

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
              <DateSelector
                day={day}
                month={month}
                year={year}
                onDayChange={handleDayChange}
                onMonthChange={handleMonthChange}
                onYearChange={handleYearChange}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                Country
              </label>
              <CountrySelector
                country={country}
                onCountryChange={handleCountryChange}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                Gender
              </label>
              <GenderSelector
                gender={gender}
                onGenderChange={handleGenderChange}
              />
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
