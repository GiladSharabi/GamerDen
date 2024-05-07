import DetailsFormField from "./DetailsFormField";
import DateSelector from "./DateSelector";
import CountrySelector from "./CountrySelector";
import GenderSelector from "./GenderSelector";

const AccountDetailsForm = () => {
  return (
    <section className="flex items-center justify-start ml-5">
      <div className="mb-10 w-full bg-gray-200 rounded-lg shadow md:max-w-4xl xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
            Your Details:
          </h1>
          <DetailsFormField
            headlineText="User Name:"
            detailText="GiladTheYemen"
            component="input"
          ></DetailsFormField>
          <DetailsFormField
            headlineText="Email:"
            detailText="gilad1197@gmail.com"
            component="input"
          ></DetailsFormField>
          <DetailsFormField
            headlineText="Date Of Birth:"
            detailText="11/9/1997"
            component={DateSelector}
          ></DetailsFormField>
          <DetailsFormField
            headlineText="Country:"
            detailText="Israel"
            component={CountrySelector}
          ></DetailsFormField>
          <DetailsFormField
            headlineText="Gender:"
            detailText="Male"
            component={GenderSelector}
          ></DetailsFormField>
          <DetailsFormField
            headlineText="Language:"
            detailText="Hebrew, English"
            component="input"
          ></DetailsFormField>
        </div>
      </div>
    </section>
  );
};

export default AccountDetailsForm;
