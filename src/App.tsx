import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { TransactionList } from '@/components/transaction/TransactionList';
import { Header } from '@/components/ui/header';
import { Toaster } from '@/components/ui/sonner';

import { AuthGuard } from '@/core/AuthGuard';

import { CategoryList } from './components/category/CategoryList';

import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Signup } from '@/pages/Signup';
import { ThemeProvider } from '@/providers/ThemeProvider';

const App = () => {
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 5000,
          classNames: {
            error: 'bg-red-400',
            info: 'bg-blue-400',
            warning: 'bg-orange-400',
          },
        }}
      />
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
