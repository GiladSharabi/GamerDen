import { Container, Typography, Link } from '@mui/material';
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

const NotFoundPage = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user } = authContext;

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <Container>
        <div className="flex flex-col items-center text-center">
          <Typography variant="h1" className="text-8xl font-bold text-gray-800">
            404
          </Typography>
          <Typography variant="h4" className="text-4xl font-medium text-gray-800">
            Page Not Found
          </Typography>
          <Link href={user ? "/dashboard" : "/"} className="mt-4 text-xl text-blue-600 hover:underline">
            Go back home
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default NotFoundPage;
