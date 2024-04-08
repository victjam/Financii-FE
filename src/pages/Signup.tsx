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
import { makeApiRequest } from '@/core/makeApiRequest';
import useAuthStore from '@/core/store/useAuthStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type User } from '@/interfaces/user.interface';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface LoginResponse {
  user: User;
  access_token: string;
}

export const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated, setUser } = useAuthStore();

  const login = async () => {
    try {
      setLoading(true);
      const { data } = await makeApiRequest<LoginResponse>(
        '/auth/token',
        'POST',
        {
          username,
          password,
        }
      );
      setIsAuthenticated(true);
      setUser(data.user);
      sessionStorage.setItem('token', data.access_token);
      navigate('/');
    } catch (error) {
      console.log('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    try {
      setLoading(true);
      await makeApiRequest('/users', 'POST', {
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      await login();
      redirectToLogin();
    } catch (error) {}
  };

  const redirectToLogin = () => {
    navigate('/home');
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  id="first-name"
                  placeholder="Max"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  id="last-name"
                  placeholder="Robinson"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                type="password"
              />
            </div>
            <Button onClick={signup} type="submit" className="w-full gap-2">
              <span>Create account</span>
              {loading && <LoadingSpinner size={18} className="text-white" />}
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with GitHub
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <a href="" onClick={redirectToLogin} className="underline">
              Login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
