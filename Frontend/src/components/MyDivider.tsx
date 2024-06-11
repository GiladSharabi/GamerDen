import { Divider } from "@mui/material";

const MyDivider = () => {
  return (
    <Divider
      variant="middle"
      sx={{
        borderBottomWidth: "3px",
        borderBottomColor: "white",
        marginTop: 2,
        marginBottom: 2,
      }}
    />
  );
};

export default MyDivider;
