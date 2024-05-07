import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Nav from "./components/Nav";

export let isLoggedIn = true;

const App = () => {
  return (
    <div className="h-screen bg-main-background-black bg-no-repeat bg-cover">
      <Router>
        <Nav></Nav>
        <AppRoutes />
      </Router>
    </div>
  );
};

export default App;
