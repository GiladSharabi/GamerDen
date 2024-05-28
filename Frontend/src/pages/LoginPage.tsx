import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { useState, useEffect } from "react";

type FormValues = {
  username: string;
  password: string;
};
type FormErrors = Partial<FormValues>;

const Login = () => {
  const navigate = useNavigate();
  const handleClickSignup = () => navigate("/sign-up");

  const [formValues, setFormValues] = useState<FormValues>({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  const handleClickLogin = (e: any) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
  };

  // useEffect(() => {}, [formErrors]);

  const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};
    if (!values.username) {
      errors.username = "Email is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  return (
    <section className="dark:bg-gray-900 flex items-center justify-center">
      <div className="w-full bg-gray-200 rounded-lg shadow dark:border md:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-white">
            Sign in to your GamerDen account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={handleClickLogin}
          >
            <FormField
              htmlFor="username"
              text="Username"
              type="text"
              id="username"
              value={formValues.username}
              onFieldChange={handleChange}
              errorMsg={formErrors.username}
            />
            <FormField
              htmlFor="password"
              text="Password"
              type="password"
              id="password"
              placeholder="••••••••"
              value={formValues.password}
              onFieldChange={handleChange}
              errorMsg={formErrors.password}
            />
            <button
              type="submit"
              className="w-full text-black bg-blue-600 hover:bg-blue-500 focus:outline-none font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-black dark:text-white">
              Don’t have an account yet?
              <button
                onClick={handleClickSignup}
                type="button"
                className="ml-1 font-bold text-primary-600 hover:underline dark:text-primary-500"
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
