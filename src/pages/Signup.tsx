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
      toast.success('La cuenta ha sido creada.');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message as string);
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
    } catch (error: any) {
      toast.error(error.message as string);
    } finally {
      setLoading(false);
    }
  };

  const redirectToLogin = () => {
    navigate('/');
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Registrarse</CardTitle>
          <CardDescription>
            Ingresa tu información para crear una cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">Nombre</Label>
                <Input
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  id="first-name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Apellido</Label>
                <Input
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  id="last-name"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                type="email"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Nombre de Usuario</Label>
              <Input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                id="email"
                type="email"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                type="password"
              />
            </div>
            <Button onClick={signup} type="submit" className="w-full gap-2">
              <span>Crear cuenta</span>
              {loading && <LoadingSpinner size={18} className="text-white" />}
            </Button>
            <Button disabled variant="outline" className="w-full">
              Registrarse con GitHub
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            ¿Ya tienes una cuenta?{' '}
            <a href="" onClick={redirectToLogin} className="underline">
              Iniciar Sesión
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
