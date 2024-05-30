import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Nav from "./components/Nav";
import { Gender } from "./api/types";
import { DateOfBirth } from "./components/DateSelector";

export let isLoggedIn = true;
export type theUser = {
  userName: string;
  email: string;
  dateOfBirth: DateOfBirth;
  country: string;
  gender: Gender;
  languages: string[];
};

const App = () => {
  return (
    <div className="bg-main-background-black bg-no-repeat bg-cover min-h-screen">
      <Router>
        <Nav></Nav>
        <AppRoutes />
      </Router>
    </div>
  );
};

export default App;
