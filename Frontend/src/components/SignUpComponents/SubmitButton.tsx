import { Button } from "@mui/material";

type SubmitButtonProps = {
  onSubmit: () => void;
};

const SubmitButton = ({ onSubmit }: SubmitButtonProps) => {
  return (
    <Button
      type="button"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={onSubmit}
    >
      Register
    </Button>
  );
};

export default SubmitButton;
