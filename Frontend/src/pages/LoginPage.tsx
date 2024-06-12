import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  Paper,
  Box,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
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

  const { AuthLogin } = authContext;

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
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={12}
        sm={3.5}
        component={Paper}
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 1,
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(5px)",
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1, width: "80%" }}>
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
                <Link to="/sign-up" style={{ textDecoration: "none" }}>
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
                </Link>
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
