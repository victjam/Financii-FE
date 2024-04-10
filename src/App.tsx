import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { CategoryList } from './components/category/CategoryList';
import { TransactionList } from './components/transaction/TransactionList';
import { AlertDestructive } from './components/ui/error-alert';
import { Header } from './components/ui/header';
import { AuthGuard } from './core/AuthGuard';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ThemeProvider } from './providers/ThemeProvider';
import { useAlertMessageStore } from './store/useAlertMessageStore';

const App = () => {
  const { alert } = useAlertMessageStore();
  return (
    <>
      {alert.enabled && <AlertDestructive error={alert.message} />}
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
    </>
  );
};

export default App;
