import React from "react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

type props = {
  headlineText: string;
  detailText: string;
  component: React.ElementType;
};

const DetailsFormField = ({ headlineText, detailText, component }: props) => {
  const [isEdit, setIsEdit] = useState(false);
  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  const [updateDetail, setUpdateDetail] = useState();
  const handleUpdateDetail = () => {
    setUpdateDetail(updateDetail);
  };

  return (
    <div className="flex">
      <label className="mr-4">{headlineText}</label>
      <div className="flex mr-8">
        {!isEdit ? (
          <label>{detailText}</label>
        ) : (
          React.createElement(component, { defaultValue: detailText })
        )}
      </div>

      {!isEdit ? (
        <MdEdit
          onClick={handleEditClick}
          className="text-2xl cursor-pointer hover:text-gray-500"
        ></MdEdit>
      ) : (
        <div className="flex">
          <FaCheck
            onClick={handleEditClick}
            className="text-2xl text-gray-800 cursor-pointer hover:text-gray-500"
          />
          <IoClose
            onClick={handleEditClick}
            className="text-2xl text-gray-800 cursor-pointer hover:text-gray-500 ml-2"
          />
        </div>
      )}
    </div>
  );
};

export default DetailsFormField;
