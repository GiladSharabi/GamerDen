import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";

const Login = () => {
  const navigate = useNavigate();
  const handleClickSignup = () => navigate("/sign-up");
  return (
    <section className="bg-black dark:bg-gray-900 flex items-center justify-center h-screen">
      <div className="w-full bg-gray-200 rounded-lg shadow dark:border md:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-white">
            Sign in to your GamerDen account
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
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
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              type="submit"
              className="w-full text-black bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-black dark:text-white">
              Don’t have an account yet?
              <button
                onClick={handleClickSignup}
                className="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                {" "}
                Sign up
              </button>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
