import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { TbLogin2 } from "react-icons/tb";
const HomePage = () => {
  return (
    <section className="flex items-start justify-start flex-col ml-5">
      <h1 className=" font-jersey text-white text-6xl font-bold mb-10 ">
        Welcome to GamerDen
      </h1>
      <h2 className=" font-poetsen text-white text-3xl mb-14">
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
            <TbLogin2 className="ml-2"></TbLogin2>
          </button>
        </Link>
        <Link to={"/sign-up"}>
          <button
            type="button"
            className="text-2xl p-2.5 w-full text-black font-bold bg-blue-600 rounded-2xl hover:bg-blue-500 focus:ring-4 flex items-center justify-center"
          >
            Sign Up
            <FaPen className="ml-2"></FaPen>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
