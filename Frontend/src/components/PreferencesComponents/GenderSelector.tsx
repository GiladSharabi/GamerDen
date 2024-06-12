import { useState } from "react";
import { Gender } from "../../api/types";

type props = {
  onGenderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMsg?: string;
};

const GenderSelector = ({ onGenderChange, errorMsg = "" }: props) => {
  const [gender, setGender] = useState(Gender.None);

  const handleGenderChange = (e: any) => {
    setGender(e.target.value);
    onGenderChange(e);
  };

  return (
    <div className="mb-3">
      <div className=" flex items-center">
        <div className="flex items-center border border-gray-200 rounded">
          <input
            id="gender-male"
            type="radio"
            value={Gender.Male}
            checked={gender === Gender.Male}
            name="gender"
            onChange={handleGenderChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
          // required
          />
          <label
            htmlFor="gender-male"
            className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
          >
            Male
          </label>
        </div>
        <div className="flex items-center ps-4 border border-gray-200 rounded">
          <input
            id="gender-female"
            type="radio"
            value={Gender.Female}
            checked={gender === Gender.Female}
            name="gender"
            onChange={handleGenderChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          // required
          />
          <label
            htmlFor="gender-female"
            className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
          >
            Female
          </label>
        </div>
      </div>
      <div>
        <p className="text-red-600 text-sm">{errorMsg}</p>
      </div>
    </div>
  );
};

export default GenderSelector;
