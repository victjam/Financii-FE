import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { AuthProvider } from "./core/AuthProvider";
import AuthGuard from "./core/AuthGuard";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ThemeProvider } from "./providers/ThemeProvider";
import { TransactionList } from "./components/transaction/TransactionList";
import { Header } from "./components/ui/header";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/transaction-list" element={<TransactionList />} />
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
    </ThemeProvider>
  );
};

export default App;
