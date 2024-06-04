import { TextareaAutosize, Box, Typography } from "@mui/material";

type BioTextareaProps = {
  bio: string;
  onChange: (value: string) => void;
};

const BioTextarea = ({ bio, onChange }: BioTextareaProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 255) {
      onChange(value);
    }
  };

  return (
    <Box sx={{ width: "100%", marginBottom: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Bio (Optinal)
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
          borderRadius: "4px",
        }}
      />
    </Box>
  );
};

export default BioTextarea;
