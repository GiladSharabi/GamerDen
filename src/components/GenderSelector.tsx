import { useState } from "react";

export enum Gender {
  Male,
  Female,
  None,
}

const GenderSelector = () => {
  const [gender, setGender] = useState(Gender.None);

  return (
    <div>
      <button
        onClick={(e) => {
          setGender(Gender.Male);
          e.preventDefault();
        }}
        className={`rounded-lg px-4 py-2 mr-4 ${
          gender === Gender.Male
            ? "bg-blue-500 text-white"
            : "bg-black text-white"
        }`}
      >
        Male
      </button>
      <button
        onClick={(e) => {
          setGender(Gender.Female);
          e.preventDefault();
        }}
        className={`rounded-lg px-4 py-2 ${
          gender === Gender.Female
            ? "bg-pink-500 text-white"
            : "bg-black text-white"
        }`}
      >
        Female
      </button>
    </div>
  );
};

export default GenderSelector;
