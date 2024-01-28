import { useState } from "react";
import { BottomWarning } from "./components/BottomWarning";
import { Button } from "./components/Button";
import { Heading } from "./components/heading";
import { InputBox } from "./components/InputBox";
import { SubHeading } from "./components/subHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = async () => {
    try {
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/signin",
        {
          username: trimmedEmail,
          password: trimmedPassword,
        }
      );
      localStorage.setItem("token", response.data.token);
      setError("");
      navigate("/dashboard");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during sign-in. Please try again.");
      }
    }
  };

  return (
    <div className=" flex items-center justify-center mt-8 bg-slate-600">
      <div>
        <Heading label={"Sign in"} />
        <SubHeading text={"Enter your credentials to access your acocunt"} />
        <InputBox
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          title={"Email"}
          placeholder={"Enter your email address"}
        />
        <InputBox
          onChange={(e) => setPassword(e.target.value)}
          title={"Password"}
          placeholder={"Enter your password"}
        />
        <div className="mt-4">
          <Button onClick={login} label={"Sign In"} />
        </div>
        {error && <p className="text-red-500 flex justify-center">{error}</p>}
        <BottomWarning
          label={"Don't have an account?"}
          ButtonText={"Sign up"}
          to={"/signup"}
        />
      </div>
    </div>
  );
};
