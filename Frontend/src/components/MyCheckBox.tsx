import { useState } from "react";

type props = {
  label: string;
};

const MyCheckBox = ({ label }: props) => {
  const [check, setCheck] = useState<boolean>(false);

  const handleClick = () => {
    setCheck(!check);
  };
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={check}
        onChange={handleClick}
        className="hidden peer"
      />
      <div
        className={`w-5 h-5 flex items-center justify-center border-2 border-gray-400 rounded-sm peer-checked:bg-blue-500 peer-checked:border-blue-500`}
      >
        {check && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
      </div>
      <span>{label}</span>
    </label>
  );
};

export default MyCheckBox;
