import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { TbLogin2 } from "react-icons/tb";
import { getUserById, getUser, login, getGames, signup } from "../api/api.endpoints";
import { UserResult } from "../api/types";
import { User } from "../api/types"
import { Game } from "../api/types";
import { FormValues } from "./SignUpPage";

const HomePage = () => {

  const handleClick = async () => {
    try {
      const user: FormValues = {
        email: "exazmpzzaaazazle2d@example.com",
        password: "passwzzfaord123",
        confirmPassword: "passwzzfaord123",
        username: "exzazadaamzaplzze_user",
        dob: { day: 1, month: 12, year: 1995 },
        country: "bazb",
        gender: 0,
        languages: ["English", "Spanish"],
      };
      const answer = await signup(user);
      if (answer) {
        console.log(answer);
      }
      // const user: Partial<User> = {
      //   email: "yes@example.com",
      //   password: "passwzzfaord123",
      //   username: "exzazdmzplzze_user",
      //   country: "big dog",
      //   languages: ["English", "Spanish"],
      //   preferences: {
      //     "bio": "i like cake very much",
      //     "region": "europapap",
      //     "voice": false,
      //     "age_range": [18, 50]
      //   }

      // };
      // await updateUser(user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  return (
    <section className="flex items-start justify-start flex-col ml-5">
      <h1 className="font-jersey text-white text-6xl font-bold mb-10">
        Welcome to GamerDen
      </h1>
      <h2 className="font-poetsen text-white text-3xl mb-14">
        Embark on your gaming journey with the perfect companion.
        <br />
        Discover your ideal gaming partner and elevate your gaming experience to
        new heights!
      </h2>
      <div className="item-center justify-center">
        <Link to={"/login"}>
          <button
            type="button"
            className="text-2xl p-2.5 w-full text-black font-bold bg-blue-600 rounded-2xl hover:bg-blue-500 focus:ring-4 mb-8 flex items-center justify-center"
          >
            Login
            <TbLogin2 className="ml-2" />
          </button>
        </Link>
        <Link to={"/sign-up"}>
          <button
            type="button"
            className="text-2xl p-2.5 w-full text-black font-bold bg-blue-600 rounded-2xl hover:bg-blue-500 focus:ring-4 flex items-center justify-center"
          >
            Sign Up
            <FaPen className="ml-2" />
          </button>
        </Link>
        <button
          onClick={handleClick}
          type="button"
          className="text-2xl p-2.5 w-full text-black font-bold bg-blue-600 rounded-2xl hover:bg-blue-500 focus:ring-4 flex items-center justify-center"
        >
          testing 123
          <FaPen className="ml-2" />
        </button>
      </div>
    </section>
  );
};

export default HomePage;
