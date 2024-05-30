import { ChangeEvent } from "react";

type props = {
  htmlFor: string;
  text: string;
  type: string;
  id: string;
  value: string;
  placeholder?: string;
  onFieldChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMsg?: string;
};

const FormField = ({
  htmlFor,
  text,
  type,
  id,
  value,
  placeholder = "",
  onFieldChange,
  errorMsg = "",
}: props) => {
  return (
    <div>
      <label htmlFor={htmlFor} className="block mb-2 font-bold text-black">
        {text}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        className="mb-3 bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        placeholder={placeholder}
        onChange={onFieldChange}
      />
      <p className="text-red-600 text-sm">{errorMsg}</p>
    </div>
  );
};

export default FormField;
