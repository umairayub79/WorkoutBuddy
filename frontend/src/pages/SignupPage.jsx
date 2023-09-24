import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import useToast from "../hooks/useToast";
const SignUp = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const showToast = useToast()
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios
        .post("/api/v1/user/signup", {
          username,
          email,
          password,
        })
        .then((response) => {
          showToast("success", "Signup successful", 100, 2000);
          navigate("/login");
        })
        .catch((error) => {
          if (error.response) {
            console.error("Status Code:", error.response.status);
            console.error("Error Message:", error.response.data);

            if (error.response.status === 400) {
              showToast("error", error.response.data.error, 100, 2000);
            } else if (error.response.status === 500) {
              showToast("error", "Internal Server Error", 100, 2000);
            } else {
              showToast("error", "Unknown Error", 100, 2000);
            }
          } else if (error.request) {
            showToast("error", "Unknown error", 100, 2000);
          } else {
            showToast("error", "Something went wrong", 100, 2000);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      showToast("error", error.message, 100, 2000);
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <div className="p-8">
          <Typography color="indigo" size="xl">
            {loading && "true<br/>"}
            Sign Up
          </Typography>
          <form onSubmit={handleSignUp}>
            <div className="mt-4">
              <Input
                type="text"
                color="indigo"
                size="md"
                label="Username"
                value={username}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <Input
                type="email"
                color="indigo"
                size="md"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <Input
                type="password"
                color="indigo"
                size="md"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <Checkbox
                color="indigo"
                size="sm"
                label="I agree to the terms and conditions"
              />
              <Button
                type="submit"
                color="indigo"
                size="md"
                ripple={true}
                disabled={loading}
                className="flex gap-2"
              >
                {loading && <Spinner />} Sign Up
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
