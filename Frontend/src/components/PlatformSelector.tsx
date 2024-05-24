import { useEffect, useState } from "react";

const platformData = ["PC", "Xbox", "PlayStation"];
export enum Platform {
  PC,
  XBOX,
  PlayStation,
}

const PlatformSelector = () => {
  const [platform, setPlatform] = useState("");
  const [platformList, setPlatformsList] = useState<string[]>([]);
  useEffect(() => {
    setPlatformsList(platformData);
  }, []);

  return (
    <div>
      <select
        value={platform}
        className="rounded"
        onChange={(e) => setPlatform(e.target.value)}
        required
      >
        <option value="">Select Platform</option>
        {platformList.map((platform) => (
          <option key={platform} value={platform}>
            {platform}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlatformSelector;
