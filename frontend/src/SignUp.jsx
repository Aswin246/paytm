import { BottomWarning } from "./components/BottomWarning";
import { Button } from "./components/Button";
import { Heading } from "./components/heading";
import { InputBox } from "./components/InputBox";
import { SubHeading } from "./components/subHeading";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();
      const trimmedFirstName = firstName.trim();
      const trimmedLastName = lastName.trim();

      const response = await axios.post(
        "http://localhost:3001/api/v1/user/signup",
        {
          username: trimmedUsername,
          password: trimmedPassword,
          firstName: trimmedFirstName,
          lastName: trimmedLastName,
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
        setError("An error occurred during sign-up. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="grid place-items-center">
        <Heading label={"Sign up"} />
        <SubHeading text={"Enter your information to create an account"} />

        <InputBox
          onChange={(e) => setFirstName(e.target.value)}
          title={"First Name"}
          placeholder={"John"}
        />

        <InputBox
          onChange={(e) => setLastName(e.target.value)}
          title={"Last Name"}
          placeholder={"David"}
        />

        <InputBox
          onChange={(e) => setUsername(e.target.value)}
          title={"Email"}
          placeholder={"Enter your email address"}
        />

        <InputBox
          className="mb-4"
          onChange={(e) => setPassword(e.target.value)}
          title={"Password"}
          placeholder={"Enter your password"}
        />

        <div className="mt-4">
          <Button onClick={handleSignUp} label={"Sign up"} />
        </div>

        {error && <p className="text-red-500 flex justify-center">{error}</p>}

        <BottomWarning
          label={"Already have an account?"}
          ButtonText={"Sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
};
