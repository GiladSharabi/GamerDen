import { useState } from "react";

const PlatformSelector = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <span
        className={`px-4 py-2 border rounded cursor-pointer hover:bg-gray-700 ${
          selectedPlatforms.includes("Xbox")
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
        onClick={() => togglePlatform("Xbox")}
      >
        Xbox
      </span>
      <span
        className={`px-4 py-2 border rounded cursor-pointer hover:bg-gray-700 ${
          selectedPlatforms.includes("PlayStation")
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
        onClick={() => togglePlatform("PlayStation")}
      >
        PlayStation
      </span>
      <span
        className={`px-4 py-2 border rounded cursor-pointer hover:bg-gray-700 ${
          selectedPlatforms.includes("PC")
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
