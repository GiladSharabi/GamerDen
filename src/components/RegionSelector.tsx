import { useEffect, useState } from "react";
import regionsData from "../regions.json";

const RegionSelector = () => {
  const [region, setRegion] = useState("");
  const [regionsList, setRegionsList] = useState<string[]>([]);
  useEffect(() => {
    setRegionsList(regionsData.regions);
  }, []);

  return (
    <div>
      <select
        value={region}
        className="rounded"
        onChange={(e) => setRegion(e.target.value)}
        required
      >
        <option value="">Select Region</option>
        {regionsList.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionSelector;
