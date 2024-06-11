import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { useRef, useState } from "react";
import { login } from "../api/api.endpoints";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

const LoginPage = () => {

  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user, AuthLogin } = authContext;

  console.log(user);
  const [hasError, setHasError] = useState<boolean>(false);
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleClick = async () => {
    try {
      if (usernameRef.current && passwordRef.current) {
        const result = await login(
          usernameRef.current.value,
          passwordRef.current.value
        );
        if (result.success) {
          setHasError(false);
          AuthLogin(result.accessToken);
          navigate("/dashboard");
        } else {
          setHasError(true);
          console.log("Failed in login: " + result.error);
        }
      }
    } catch (e) {
      console.log("Error Signin: " + e);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        component={Paper}
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url(./src/images/LoginBackground.jpeg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(5px)",
            p: 4,
            borderRadius: 4,
            width: { xs: "90%", sm: "80%", md: "60%", lg: "40%", xl: "30%" },
            maxWidth: "600px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              inputRef={usernameRef}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordRef}
            />
            {hasError ? (
              <Alert severity="error" sx={{ width: "100%" }}>
                Invalid Username or Password. Please try again.
              </Alert>
            ) : (
              <></>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClick}
            >
              Sign In
            </Button>
            <Grid
              container
              sx={{ justifyContent: "flex-start", alignItems: "center" }}
            >
              <Typography variant="body2">
                Don't have an account?&nbsp;
                <RouterLink to="/sign-up" style={{ textDecoration: "none" }}>
                  <span
                    style={{
                      textDecoration: "none",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.textDecoration = "underline")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.textDecoration = "none")
                    }
                  >
                    Sign Up
                  </span>
                </RouterLink>
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
