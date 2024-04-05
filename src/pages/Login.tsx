import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { makeApiRequest } from "@/core/makeApiRequest";
import useAuthStore from "@/core/store/useAuthStore";
import { User } from "@/interfaces/user.interface";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuthStore();

  const login = async () => {
    try {
      setLoading(true);
      const response = await makeApiRequest(
        "http://127.0.0.1:8000/api/auth/token",
        "POST",
        {
          username: username,
          password: password,
        }
      );
      setIsAuthenticated(true);
      setUser(response.data.user as User);
      navigate("/");
    } catch (error) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const redirectToSignup = () => {
    navigate("/signup");
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center">
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
              <div className="text-red-500 text-sm text-center bold">
                {error}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
            Don&apos;t have an account?{" "}
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
