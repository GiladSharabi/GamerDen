import { Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUp from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LoggedinHomePage from "./pages/LoggedinHomePage";
import AccountPage from "./pages/AccountPage";
import EditGamingPreferences from "./pages/EditGamingPreferencesPage";
import EditPersonalDetailsPage from "./pages/EditPersonalDetailsPage";
import Background from "./components/Background";
import NavBar from "./components/NavBar/NavBar";
import ProfilePage from "./pages/ProfilePage";

const AppRoutes = () => {
  return (
    <Background>
      <NavBar />
      <div className="overflow-auto h-screen w-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/account" element={<AccountPage />} />
          <Route
            path="/edit-personal-details"
            element={<EditPersonalDetailsPage />}
          />
          <Route
            path="/edit-gaming-preferences"
            element={<EditGamingPreferences />}
          />
          <Route path="/dashboard" element={<LoggedinHomePage />} />
          <Route path="/profile/{user}" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Background>
  );
};

export default AppRoutes;
