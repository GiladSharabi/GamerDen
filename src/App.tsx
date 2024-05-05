import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Nav from "./components/Nav";

const App = () => {
  return (
    <div className="bg-black">
      <Router>
        <Nav></Nav>
        <AppRoutes />
      </Router>
    </div>
  );
};

export default App;
