import { Link } from "react-router-dom";
import { Typography, Button, Grid, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const PersonalDetailsSection = () => {
  return (
    <section className="ml-5">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            className="bg-gray-200 rounded-lg shadow-md p-6"
            sx={{ border: "1px solid #ccc" }}
          >
            <Typography variant="h5" gutterBottom>
              Personal Details:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  <li>
                    <Typography variant="body1">
                      <strong>User Name:</strong> GiladTheYemen
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Email:</strong> gilad1197@gmail.com
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Date Of Birth:</strong> 11/9/1997
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Country:</strong> Israel
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Gender:</strong> Male
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Languages:</strong> Hebrew, English
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      <strong>Bio:</strong> I'm a very talented player
                    </Typography>
                  </li>
                </ul>
              </Grid>
            </Grid>
            <Link to={"/edit-personal-details"} className="mt-8">
              <Button
                variant="contained"
                color="primary"
                endIcon={<EditIcon />}
              >
                Edit
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </section>
  );
};

export default PersonalDetailsSection;
