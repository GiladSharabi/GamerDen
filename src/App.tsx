import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Nav from "./components/Nav";

export let isLoggedIn = false;

const App = () => {
  return (
    <div className="bg-black h-screen">
      <Router>
        <Nav></Nav>
        <AppRoutes />
      </Router>
    </div>
  );
};

export default App;
