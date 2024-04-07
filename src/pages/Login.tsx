import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { makeApiRequest } from '@/core/makeApiRequest';
import useAuthStore from '@/core/store/useAuthStore';
import { type User } from '@/interfaces/user.interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginResponse {
  data: {
    user: User;
    access_token: string;
  };
}

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuthStore();

  const login = async () => {
    try {
      setLoading(true);
      const response: LoginResponse = await makeApiRequest(
        '/auth/token',
        'POST',
        {
          username,
          password,
        }
      );
      setIsAuthenticated(true);
      setUser(response.data.user);
      sessionStorage.setItem('token', response.data.access_token);
      navigate('/');
    } catch (error) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const redirectToSignup = () => {
    navigate('/signup');
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Hi, Welcome back ✋, Enter your email below to login to your
            account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {error && (
              <div className="text-center text-sm text-red-500">{error}</div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="string"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                required
              />
            </div>
            <Button
              disabled={loading}
              type="submit"
              onClick={login}
              className="w-full space-x-2"
            >
              <span>Login</span>
              {loading && <LoadingSpinner size={18} className="text-white" />}
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <a
              onClick={redirectToSignup}
              href="#"
              className="text-primary underline"
            >
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
