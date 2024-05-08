import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import DateSelector from "../components/DateSelector";
import CountrySelector from "../components/CountrySelector";
import GenderSelector from "../components/GenderSelector";
import LanguagesSelector from "../components/LanguagesSelector";

const SignUp = () => {
  const navigate = useNavigate();
  const handleClickRegister = (e: any) => {
    e.stopPropogation();
    navigate("/");
  };

  return (
    <section className="flex items-center justify-center">
      <div className="mb-10 w-full bg-gray-200 rounded-lg shadow md:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
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
              placeholder="example@example.com"
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
              <label className="block mb-2 text-sm font-medium text-black">
                Date Of Birth
              </label>
              <DateSelector />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-black">
                Country
              </label>
              <CountrySelector />
            </div>
            <div>
              <div>
                <label className="block text-sm font-medium text-black">
                  Gender
                </label>
                <GenderSelector />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Languages
                </label>
                <LanguagesSelector />
              </div>
            </div>
            <button
              onClick={handleClickRegister}
              type="submit"
              className="w-full text-black bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
