import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <div className="bg-main-background-black bg-no-repeat bg-cover min-h-screen">
      <Router>
        <NavBar />
        <AppRoutes />
      </Router>
    </div>
  );
};

export default App;
