import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./core/AuthProvider";
import AuthGuard from "./core/AuthGuard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <AuthGuard>
                <Home />
              </AuthGuard>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
