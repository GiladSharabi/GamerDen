import DetailsFormField from "./DetailsFormField";
import { Link } from "react-router-dom";

const PersonalDetailsSection = () => {
  return (
    <section className="flex items-center justify-start ml-5">
      <div className=" w-full bg-gray-200 rounded-lg shadow md:max-w-4xl xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
            Personal Details:
          </h1>
          <DetailsFormField
            labelText="User Name:"
            detailText="GiladTheYemen"
          ></DetailsFormField>
          <DetailsFormField
            labelText="Email:"
            detailText="gilad1197@gmail.com"
          ></DetailsFormField>
          <DetailsFormField
            labelText="Date Of Birth:"
            detailText="11/9/1997"
          ></DetailsFormField>
          <DetailsFormField
            labelText="Country:"
            detailText="Israel"
          ></DetailsFormField>
          <DetailsFormField
            labelText="Gender:"
            detailText="Male"
          ></DetailsFormField>
          <DetailsFormField
            labelText="Languages:"
            detailText="Hebrew, English"
          ></DetailsFormField>
          <Link to={"/edit-personal-details"}>
            <button
              type="button"
              className="mt-8 text-black bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Edit
            </button>
          </Link>

          {/* <DateSelector
          defaultDay={theUser.dateOfBirth.}
            defaultMonth="Date Of Birth:"
            defaultYear="11/9/1997"
          ></DateSelector>
          <DetailsFormField
            labelText="Country:"
            detailText="Israel"
          ></DetailsFormField>
          <DetailsFormField
            labelText="Gender:"
            detailText="Male"
          ></DetailsFormField>
          <DetailsFormField
            labelText="Languages:"
            detailText="Hebrew, English"
          ></DetailsFormField> */}
        </div>
      </div>
    </section>
  );
};

export default PersonalDetailsSection;
