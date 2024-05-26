import { useState } from "react";

export enum Gender {
  Male,
  Female,
  None,
}

const GenderSelector = () => {
  const [gender, setGender] = useState(Gender.None);

  const handleGenderChange = (selectedGender: Gender) => {
    setGender(selectedGender);
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center border border-gray-200 rounded">
        <input
          id="bordered-radio-1"
          type="radio"
          value={Gender.Male}
          checked={gender === Gender.Male}
          name="gender"
          onChange={() => handleGenderChange(Gender.Male)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
          // required
        />
        <label
          htmlFor="bordered-radio-1"
          className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
        >
          Male
        </label>
      </div>
      <div className="flex items-center ps-4 border border-gray-200 rounded">
        <input
          id="bordered-radio-2"
          type="radio"
          value={Gender.Female}
          checked={gender === Gender.Female}
          name="gender"
          onChange={() => handleGenderChange(Gender.Female)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
          // required
        />
        <label
          htmlFor="bordered-radio-2"
          className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
        >
          Female
        </label>
      </div>
    </div>
  );
};

export default GenderSelector;
