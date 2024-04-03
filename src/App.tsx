import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./core/AuthProvider";
import AuthGuard from "./core/AuthGuard";
import AddTransactionForm from "./components/transaction/AddTransactionForm";
import { useDarkModeStore } from "./store/darkMode";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

const App = () => {
  const { darkMode, setDarkMode } = useDarkModeStore();

  return (
    <main className={`text-foreground bg-background light`}>
      {darkMode ? (
        <button onClick={() => setDarkMode(false)}>
          <FaSun />
        </button>
      ) : (
        <button onClick={() => setDarkMode(true)}>
          <FaMoon />
        </button>
      )}
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/add-transaction" element={<AddTransactionForm />} />
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
    </main>
  );
};

export default App;
