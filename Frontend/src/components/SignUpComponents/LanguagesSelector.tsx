import { useState, useEffect } from "react";
import { TextField, Chip } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { languages as LanguageListing } from "../../languages.json";

type LanguageSelectorProps = {
  languages: string[];
  onChange: (languages: string[]) => void;
  languageError?: string;
};

const LanguageSelector = ({
  languages,
  onChange,
  languageError = "",
}: LanguageSelectorProps) => {
  const [allLanguages, setAllLanguages] = useState<string[]>([]);

  useEffect(() => {
    const languageList: string[] = LanguageListing;
    setAllLanguages(languageList.filter((lang) => !languages.includes(lang)));
  }, [languages]);

  const handleAddLanguage = (language: string) => {
    if (allLanguages.includes(language)) {
      onChange([...languages, language]);
      setAllLanguages(allLanguages.filter((lang) => lang !== language));
    }
  };

  const handleRemoveLanguage = (language: string) => {
    onChange(languages.filter((lang) => lang !== language));
    setAllLanguages([...allLanguages, language]);
  };

  return (
    <div className="mt-2">
      <Autocomplete
        options={allLanguages}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Language"
            error={Boolean(languageError)}
            helperText={languageError}
            sx={{
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: languageError === "" ? "default" : "red",
              },
            }}
          />
        )}
        onChange={(event, value) => value && handleAddLanguage(value)}
      />
      <div>
        {languages.map((language) => (
          <Chip
            key={language}
            label={language}
            onDelete={() => handleRemoveLanguage(language)}
            variant="outlined"
            color="primary"
            sx={{
              margin: "0.5rem 0",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
