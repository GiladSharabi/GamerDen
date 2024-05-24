import { useState } from "react";

export enum SoloOrGroup {
  Solo,
  Group,
}

const SoloOrGroupSelector = () => {
  const [option, setOption] = useState<SoloOrGroup>();

  const handleOptionChange = (selectedOption: SoloOrGroup) => {
    setOption(selectedOption);
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center border border-gray-200 rounded">
        <input
          id="solo-radio"
          type="radio"
          value={SoloOrGroup.Solo}
          checked={option === SoloOrGroup.Solo}
          name="solo"
          onChange={() => handleOptionChange(SoloOrGroup.Solo)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
          required
        />
        <label
          htmlFor="solo-radio"
          className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
        >
          Solo
        </label>
      </div>
      <div className="flex items-center ps-4 border border-gray-200 rounded">
        <input
          id="group-radio"
          type="radio"
          value={SoloOrGroup.Group}
          checked={option === SoloOrGroup.Group}
          name="gender"
          onChange={() => handleOptionChange(SoloOrGroup.Group)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
          required
        />
        <label
          htmlFor="group-radio"
          className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
        >
          Group
        </label>
      </div>
    </div>
  );
};

export default SoloOrGroupSelector;
