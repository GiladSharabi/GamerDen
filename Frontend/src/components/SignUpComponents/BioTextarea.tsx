import { TextareaAutosize, Box, Typography } from "@mui/material";

type BioTextareaProps = {
  textColor?: string;
  bio: string;
  onChange: (value: string) => void;
};

const BioTextarea = ({ bio, onChange, textColor }: BioTextareaProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 255) {
      onChange(value);
    }
  };

  return (
    <Box sx={{ width: "100%", marginBottom: 2, mt: 2 }}>
      <Typography
        variant="subtitle1"
        gutterBottom
        color={textColor ?? textColor}
      >
        Bio (Optional)
      </Typography>
      <TextareaAutosize
        placeholder="Type your biography here..."
        value={bio}
        onChange={handleChange}
        style={{
          width: "100%",
          resize: "none",
          padding: "8px",
          border: "1px solid #ccc",
          borderColor: "gray",
          borderRadius: "4px",
          color: textColor,
          backgroundColor: "transparent",
        }}
      />
    </Box>
  );
};

export default BioTextarea;
