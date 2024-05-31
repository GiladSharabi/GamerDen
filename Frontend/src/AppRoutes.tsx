import { Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUp from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LoggedinHomePage from "./pages/LoggedinHomePage";
import AccountPage from "./pages/AccountPage";
import EditGamingPreferences from "./pages/EditGamingPreferencesPage";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/account" element={<AccountPage />} />
        {/* <Route
          path="/edit-personal-details"
          element={<EditPersonalDetails />}
        /> */}
        <Route
          path="/edit-gaming-preferences"
          element={<EditGamingPreferences />}
        />
        <Route path="/user-loggedin-homepage" element={<LoggedinHomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
