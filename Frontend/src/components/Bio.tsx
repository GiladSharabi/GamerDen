import { ChangeEvent } from "react";
type props = {
  value?: string;
  onBioChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};
const Bio = ({ value = "", onBioChange }: props) => {
  return (
    <div>
      <textarea
        value={value}
        className="resize-none bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
        rows={3}
        cols={50}
        onChange={onBioChange}
        id="bio"
        name="bio"
        placeholder="Enter your bio..."
      />
    </div>
  );
};

export default Bio;
