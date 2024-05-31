type props = {
    labelText: string;
    detailText: string;
};

const DetailsFormField = ({ labelText, detailText }: props) => {
    return (
        <div className="flex">
            <label className="mr-4 font-bold">{labelText}</label>
            <label>{detailText}</label>

            {/* {!isEdit ? (
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
        )} */}
        </div>
    );
};

export default DetailsFormField;