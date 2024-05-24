import { useState } from "react";

const PlatformSelector = () => {
  const [chosenPlatforms, setChosenPlatforms] = useState<string[]>([]);

  const togglePlatform = (platform: string) => {
    if (chosenPlatforms.includes(platform)) {
      setChosenPlatforms(chosenPlatforms.filter((p) => p !== platform));
    } else {
      setChosenPlatforms([...chosenPlatforms, platform]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <span
        className={`px-4 py-2 border rounded cursor-pointer hover:bg-gray-700 ${
          chosenPlatforms.includes("Xbox")
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
        onClick={() => togglePlatform("Xbox")}
      >
        Xbox
      </span>
      <span
        className={`px-4 py-2 border rounded cursor-pointer hover:bg-gray-700 ${
          chosenPlatforms.includes("PlayStation")
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
        onClick={() => togglePlatform("PlayStation")}
      >
        PlayStation
      </span>
      <span
        className={`px-4 py-2 border rounded cursor-pointer hover:bg-gray-700 ${
          chosenPlatforms.includes("PC")
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
        onClick={() => togglePlatform("PC")}
      >
        PC
      </span>
    </div>
  );
};

export default PlatformSelector;
