import { useEffect, useState } from "react";
import languageData from "../languages.json";

const LanguagesSelector = () => {
  const [languagesList, setLanguagesList] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  useEffect(() => {
    setLanguagesList(languageData.languages);
  }, []);

  const handleLanguageChange = (e: any) => {
    const selectedLanguage = e.target.value;
    addLanguage(selectedLanguage);
  };

  const addLanguage = (language: string) => {
    if (language !== "" && !selectedLanguages.includes(language)) {
      const updatedLanguages = [...selectedLanguages, language].sort();
      setSelectedLanguages(updatedLanguages);
    }
  };

  const handleRemoveLanguage = (languageToRemove: string) => {
    const updatedLanguages = selectedLanguages.filter(
      (language) => language !== languageToRemove
    );
    setSelectedLanguages(updatedLanguages);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4 items-center">
        <select
          onChange={handleLanguageChange}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
          required
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
    </div>
  );
};

export default LanguagesSelector;
