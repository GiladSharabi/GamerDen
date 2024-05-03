// GenderSelector.tsx
import React from "react";

interface GenderSelectorProps {
  gender: string;
  onGenderChange: (value: string) => void;
}

const GenderSelector: React.FC<GenderSelectorProps> = ({
  gender,
  onGenderChange,
}) => {
  return (
    <div>
      <button
        onClick={() => onGenderChange("male")}
        className={`rounded-lg px-4 py-2 mr-4 ${
          gender === "male" ? "bg-blue-500 text-white" : "bg-black text-white"
        }`}
      >
        Male
      </button>
      <button
        onClick={() => onGenderChange("female")}
        className={`rounded-lg px-4 py-2 ${
          gender === "female" ? "bg-pink-500 text-white" : "bg-black text-white"
        }`}
      >
        Female
      </button>
    </div>
  );
};

export default GenderSelector;
