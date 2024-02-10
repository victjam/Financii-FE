import { FC, useState } from "react";

const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    console.log(username, password);
  };

  return (
    <>
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
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                name="username"
                id="username"
                className="mt-1 w-full h-9 p-2  border border-slate-300 rounded-md
          focus:outline-none focus:border-sky-500 transition-all duration-300 ease-in-out"
              />
            </div>
            <div>
              <label className="text-xs font-light">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                id="password"
                className="mt-1 w-full h-9 p-2  border border-slate-300 rounded-md
          focus:outline-none focus:border-sky-500 transition-all duration-300 ease-in-out"
              />
            </div>
          </div>
          <button
            onClick={login}
            className="mt-10 transition-background inline-flex h-10 w-full text-white items-center justify-center rounded-md  bg-gradient-to-r from-blue-400 via-blue-400 to-blue-600 bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium  duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 "
          >
            Login
          </button>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="rounded-sm bg-sky-500 checked:bg-sky-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out"
              />
              <label htmlFor="remember-me" className="ml-2 text-xs font-light">
                Remember me
              </label>
            </div>
            <a href="#" className="text-xs font-light text-sky-500">
              Forgot password?
            </a>
          </div>
          <div className="mt-5">
            <p className="text-xs font-light">
              Don't have an account?{" "}
              <a href="#" className="text-sky-500">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
