import { Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import NotFoundPage from "./components/NotFoundPage";
import SignUp from "./components/SignUp";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;