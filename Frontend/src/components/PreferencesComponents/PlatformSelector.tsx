import { Typography, ToggleButton, ToggleButtonGroup, Grid, ThemeProvider } from "@mui/material";
import { MouseEvent } from "react";
import { Platform } from "../../api/types";
import theme from "../Theme";

type props = {
  label: string;
  selectedPlatforms: Platform[];
  onChange: (event: MouseEvent<HTMLElement>, newPlatform: Platform[]) => void;
};

const PlatformSelector = ({
  selectedPlatforms = [],
  onChange,
  label = "Select teammate Platforms",
}: props) => {

  const platformValues = Object.values(Platform);

  return (
    <ThemeProvider theme={theme}>
      <Grid className="mb-2">
        <Typography gutterBottom>
          {label}
        </Typography>
        <ToggleButtonGroup
          color="secondary"
          value={selectedPlatforms}
          exclusive={false}
          fullWidth
          onChange={(event, newValue) => onChange(event, newValue)}
        >
          {platformValues.map((platform) => (
            <ToggleButton key={platform} value={platform}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: '#fff',
                },
              }}

            >
              {platform}
            </ToggleButton>
          ))}

        </ToggleButtonGroup>
      </Grid>
    </ThemeProvider>
  );
};
export default PlatformSelector;
