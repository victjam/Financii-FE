import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuthStore();

  const login = async () => {
    try {
      setLoading(true);
      const response: LoginResponse = await makeApiRequest(
        '/auth/token',
        'POST',
        { username, password }
      );
      setIsAuthenticated(true);
      setUser(response.data.user);
      sessionStorage.setItem('token', response.data.access_token);
      navigate('/');
    } catch (error: any) {
      toast.error(error.message as string);
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
          <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
          <CardDescription>
            Hola, bienvenido de nuevo ✋, introduce tu correo electrónico abajo
            para iniciar sesión en tu cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
                <a href="#" className="ml-auto inline-block text-sm underline">
                  ¿Olvidaste tu contraseña?
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
              <span>Iniciar Sesión</span>
              {loading && <LoadingSpinner size={18} className="text-white" />}
            </Button>
            <Button disabled variant="outline" className="w-full">
              Iniciar sesión con Github
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            ¿No tienes una cuenta?{' '}
            <a
              onClick={redirectToSignup}
              href="#"
              className="text-primary underline"
            >
              Regístrate
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
