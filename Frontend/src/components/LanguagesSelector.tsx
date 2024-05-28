import { useEffect, useState } from "react";
import languageData from "../languages.json";

type props = {
  onLanguagesListChange: (languages: string[]) => void;
  errorMsg?: string;
};

const LanguagesSelector = ({ onLanguagesListChange, errorMsg = "" }: props) => {
  const [languagesList, setLanguagesList] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  useEffect(() => {
    // init the languages list from the json file
    setLanguagesList(languageData.languages);
  }, []);

  const handleLanguageChange = (e: any) => {
    const selectedLanguage = e.target.value;
    addLanguage(selectedLanguage);
  };
  useEffect(() => {
    onLanguagesListChange(selectedLanguages);
  }, [selectedLanguages]);

  const addLanguage = (language: string) => {
    if (language !== "" && !selectedLanguages.includes(language)) {
      const updatedLanguages = [...selectedLanguages, language].sort();
      setSelectedLanguages(updatedLanguages);
      // console.log(
      //   "languages list: " +
      //     updatedLanguages +
      //     "\nlength:" +
      //     updatedLanguages.length
      // );
    }
  };

  const handleRemoveLanguage = (languageToRemove: string) => {
    const updatedLanguages = selectedLanguages.filter(
      (language) => language !== languageToRemove
    );
    setSelectedLanguages(updatedLanguages);
    // console.log(
    //   "languages list: " +
    //     updatedLanguages +
    //     "\nlength:" +
    //     updatedLanguages.length
    // );
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4 items-center">
        <select
          onChange={handleLanguageChange}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
          value=""
        >
          <option value="">Select Languages</option>
          {languagesList.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
      <div>
        {selectedLanguages.map((language) => (
          <span
            key={language}
            className="mb-3 inline-block bg-gray-400 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            {language}
            <button
              onClick={() => handleRemoveLanguage(language)}
              className="ml-1 p-1 text-lg"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <div>
        <p className="text-red-600 text-sm">{errorMsg}</p>
      </div>
    </div>
  );
};

export default LanguagesSelector;
