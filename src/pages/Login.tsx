import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    console.log(username, password);
  };

  const redirectToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col space-y-5 w-3/12">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">Login</h1>
          <p className="font-light">Hi, Welcome back ✋</p>
        </div>
        <div>
          <button className="w-full h-10 rounded-md bg-white border border-slate-300 text-slate-400 font-medium focus:outline-none flex space-x-2 items-center justify-center">
            <span> Continue with Google</span>
            <img
              height={20}
              width={20}
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
              alt="google"
            />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex-1 h-px bg-slate-300"></div>
          <p className="text-xs font-light text-slate-500">Or</p>
          <div className="flex-1 h-px bg-slate-300"></div>
        </div>
        <div>
          <div className="space-y-2">
            <div>
              <label className="text-xs font-light">Username</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                id="username"
                type="text"
              />
            </div>
            <div>
              <label className="text-xs font-light">Password</label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                id="password"
                type="password"
              />
            </div>
          </div>
          <Button onClick={login}>Login</Button>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="rounded-sm bg-primary checked:bg-primary checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out"
              />
              <label htmlFor="remember-me" className="ml-2 text-xs font-light">
                Remember me
              </label>
            </div>
            <a href="#" className="text-xs font-light text-primary">
              Forgot password?
            </a>
            B
          </div>
          <div className="mt-5">
            <p className="text-xs font-light">
              Don't have an account?{" "}
              <a onClick={redirectToSignup} href="#" className="text-primary">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
