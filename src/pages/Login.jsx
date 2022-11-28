import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/AuthContext";
import { CircleLoader, HashLoader, ScaleLoader } from "react-spinners";
import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Loader,
} from "@mantine/core";
import { Alien, At } from "tabler-icons-react";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    isError: false,
    msg: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      if (response.status) {
        console.log(response);
        localStorage.setItem("token", response.token);
        setUser({ isLoggedin: true, username: credentials.username });
        navigate("/");
      } else {
        setError({ isError: true, msg: response.data });
      }
    } catch (e) {
      setError({ isError: true, msg: "Unknown error occured!!" });
    }
    setLoading(false);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Container size={420} my={40}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          padding: "0px 20px",
          backgroundColor: "pink",
        }}
      >
        {error.isError && <span>{error.msg}</span>}
      </Box>
      <h1 className="font-bold text-center">Welcome back!</h1>

      <Text color="dimmed" size="md" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Text component={Link} to="/register" size="sm" color="teal" underline>
          Create account
        </Text>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextInput
            label="Username"
            name="username"
            variant="filled"
            icon={<At />}
            size="md"
            placeholder="name@example.com"
            value={credentials.username}
            onChange={onChange}
            required
          />
          <PasswordInput
            label="Password"
            icon={<Alien />}
            mt="md"
            name="password"
            variant="filled"
            size="md"
            placeholder="Your password"
            value={credentials.password}
            onChange={onChange}
            required
          />
          <button
            type="submit"
            className="mt-4 w-full bg-teal-200 px-6 py-2 rounded text-teal-900 hover:bg-teal-400 trasnition font-bold"
          >
            {loading ? <Loader size="sm" color="#ffffff" /> : "Sign in"}
          </button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
