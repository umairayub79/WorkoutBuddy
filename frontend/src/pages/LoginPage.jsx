import React, { useContext, useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { AuthContext } from "../context/Auth/AuthContext";
import useToast from "../hooks/useToast";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const showToast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios
        .post("/api/v1/user/login", {
          email,
          password,
        })
        .then((response) => {
          dispatch({
            type: "LOGIN_USER",
            payload: response.data.token,
          });
          showToast("success", "Login successful", 100, 2000);
        })
        .catch((error) => {
          if (error.response) {
            console.error("Status Code:", error.response.status);
            console.error("Error Message:", error.response.data);

            if (error.response.status === 401) {
              showToast("error", "Incorrect email or password", 100, 2000);
            } else if (error.response.status === 500) {
              showToast("error", "Internal Server Error", 100, 2000);
            } else {
              showToast("error", "Unknow Error", 100, 2000);
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
            Login
          </Typography>
          <div className="mt-4">
            <Input
              type="email"
              color="indigo"
              size="lg"
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
              size="lg"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <Checkbox color="indigo" size="sm" label="Remember me" />
            <Button
              color="indigo"
              size="md"
              ripple={true}
              onClick={handleLogin}
              disabled={loading}
              className="flex gap-2"
            >
              {loading && <Spinner/>} Sign In
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
