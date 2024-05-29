import SaveButton from "./SaveButton";
import { useState } from "react";
import RegionSelector from "./RegionSelector";
import PlatformSelector from "./PlatformSelector";
import SoloOrGroupSelector from "./SoloOrGroupSelector";
import VoiceSelector from "./VoiceSelector";
import TeammatePlatfromSelector from "./TeammatePlatfromSelector";
import AgeRangeSelector from "./AgeRangeSelector";

const EditGamingPreferencesSection = () => {
  const [bioText, setBioText] = useState("");

  const handleBioChange = (e: any) => {
    setBioText(e.target.value);
  };

  return (
    <section className="flex items-center justify-start ml-5">
      <div className="mb-5 w-full bg-gray-200 rounded-lg shadow md:max-w-4xl xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
            Edit Your Gaming Preferences:
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                htmlFor="bio"
                className="block mb-2 text-sm text-black  font-bold"
              >
                Bio:
              </label>
              <textarea
                value={bioText}
                className="resize-none bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                rows={3}
                cols={50}
                onChange={handleBioChange}
                id="bio"
                placeholder="Enter your bio..."
                required
              />
            </div>
            <div>
              <label
                htmlFor="region"
                className="block mb-2 text-sm  text-black font-bold"
              >
                Region:
              </label>
              <RegionSelector></RegionSelector>
            </div>
            <div>
              <label
                htmlFor="platform"
                className="block mb-2 text-sm text-black font-bold"
              >
                Platform:
              </label>
              <PlatformSelector></PlatformSelector>
            </div>
            <div>
              <label className="block mb-2 text-sm text-black font-bold">
                Are you searching alone or with other group?
              </label>
              <SoloOrGroupSelector></SoloOrGroupSelector>
            </div>
            <div>
              <label className="block mb-2 text-sm text-black font-bold">
                Do you want to talk on voice?
              </label>
              <VoiceSelector></VoiceSelector>
            </div>
            <div>
              <label className="block mb-2 text-sm  text-black font-bold">
                Teammate Platform:
              </label>
              <TeammatePlatfromSelector></TeammatePlatfromSelector>
            </div>
            <div className="flex">
              <label className="block mb-2 text-sm text-black mr-5 font-bold">
                Age Range:
              </label>
              <AgeRangeSelector></AgeRangeSelector>
            </div>

            <SaveButton></SaveButton>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditGamingPreferencesSection;
