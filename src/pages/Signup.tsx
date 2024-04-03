import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

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
            <Input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              name="username"
              id="username"
            />
          </div>
          <div>
            <label className="text-xs font-light">First Name</label>
            <Input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              name="firstName"
              id="firstName"
            />
          </div>
          <div>
            <label className="text-xs font-light">Last Name</label>
            <Input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              name="lastName"
              id="lastName"
            />
          </div>
          <div>
            <label className="text-xs font-light">Email</label>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              id="email"
            />
          </div>
          <div>
            <label className="text-xs font-light">Password</label>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
              id="password"
            />
          </div>
        </div>
        <Button onClick={signup}>Signup</Button>
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
