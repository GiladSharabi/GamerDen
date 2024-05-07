import { Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUp from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LoginHomePage from "./pages/LoginHomePage";
import AccountPage from "./pages/AccountPage";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/user-loggedin" element={<LoginHomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
