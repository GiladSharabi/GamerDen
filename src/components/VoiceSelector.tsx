import { useState } from "react";

export enum UseVoice {
  Yes,
  No,
  None,
}

const VoiceSelector = () => {
  const [option, setOption] = useState(UseVoice.None);

  const handleOptionChange = (selectedOption: UseVoice) => {
    setOption(selectedOption);
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center border border-gray-200 rounded">
        <input
          id="yes-radio"
          type="radio"
          value="yes"
          checked={option === UseVoice.Yes}
          name="yes-radio"
          onChange={() => handleOptionChange(UseVoice.Yes)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
          required
        />
        <label
          htmlFor="yes-radio"
          className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
        >
          Yes
        </label>
      </div>
      <div className="flex items-center ps-4 border border-gray-200 rounded">
        <input
          id="no-radio"
          type="radio"
          value="no"
          checked={option === UseVoice.No}
          name="no-radio"
          onChange={() => handleOptionChange(UseVoice.No)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
          required
        />
        <label
          htmlFor="no-radio"
          className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
        >
          No
        </label>
      </div>
    </div>
  );
};

export default VoiceSelector;
