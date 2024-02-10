import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup: FC = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = () => {
    console.log(username, firstName, lastName, email, password);
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col space-y-5 w-3/12">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">Signup</h1>
          <p className="font-light">Hi, Welcome ✋</p>
        </div>
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
          focus:outline-none focus:border-primary transition-all duration-300 ease-in-out"
            />
          </div>
          <div>
            <label className="text-xs font-light">First Name</label>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              name="firstName"
              id="firstName"
              className="mt-1 w-full h-9 p-2  border border-slate-300 rounded-md
          focus:outline-none focus:border-primary transition-all duration-300 ease-in-out"
            />
          </div>
          <div>
            <label className="text-xs font-light">Last Name</label>
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              name="lastName"
              id="lastName"
              className="mt-1 w-full h-9 p-2  border border-slate-300 rounded-md
          focus:outline-none focus:border-primary transition-all duration-300 ease-in-out"
            />
          </div>
          <div>
            <label className="text-xs font-light">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              id="email"
              className="mt-1 w-full h-9 p-2  border border-slate-300 rounded-md
          focus:outline-none focus:border-primary transition-all duration-300 ease-in-out"
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
          focus:outline-none focus:border-primary transition-all duration-300 ease-in-out"
            />
          </div>
        </div>
        <button
          onClick={signup}
          className="mt-10 transition-background inline-flex h-10 w-full text-white items-center justify-center rounded-md  bg-gradient-to-r from-primary via-primary to-primaryDark bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium  duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 "
        >
          Signup
        </button>
        <div className="mt-5">
          <p className="text-xs font-light">
            Already have an account?{" "}
            <a onClick={redirectToLogin} href="#" className="text-primary">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
