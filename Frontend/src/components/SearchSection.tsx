import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";

const [selectedPlatform, setSelectedPlatform] = useState<string>("");

const handleChange = (e: any) => {
  setSelectedPlatform(e.target.value);
};

const SearchSection = () => {
  return (
    <DropdownButton
      id="dropdown-item-button"
      title={selectedPlatform || "Select Platform"}
      onChange={handleChange}
    >
      <Dropdown.Item as="button" value="playstation">
        PlayStation
      </Dropdown.Item>
      <Dropdown.Item as="button" value="xbox">
        XBOX
      </Dropdown.Item>
      <Dropdown.Item as="button" value="pc">
        PC
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default SearchSection;
