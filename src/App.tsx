import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { AuthGuard } from "./core/AuthGuard";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ThemeProvider } from "./providers/ThemeProvider";
import { TransactionList } from "./components/transaction/TransactionList";
import { Header } from "./components/ui/header";
import { CategoryList } from "./components/category/CategoryList";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/transaction-list"
            element={
              <AuthGuard>
                <TransactionList />
              </AuthGuard>
            }
          />
          <Route
            path="/categories"
            element={
              <AuthGuard>
                <CategoryList />
              </AuthGuard>
            }
          />
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
    </ThemeProvider>
  );
};

export default App;
