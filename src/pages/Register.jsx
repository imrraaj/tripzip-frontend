import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Loader,
  Box,
} from "@mantine/core";
import { Alien, UserCircle } from "tabler-icons-react";
import { useUser } from "../context/AuthContext";

function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    name: "",
  });

  const [error, setError] = useState({
    isError: false,
    msg: "",
  });
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUser();

  const navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    console.log(credentials);
    e.preventDefault();
    setLoading(true);
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
        name: credentials.name,
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
    setLoading(false);
  };
  return (
    <Container size={480} my={40}>
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
        Already have an account?{" "}
        <Text
          component={Link}
          to="/login"
          size="md"
          weight="600"
          color="teal"
          underline
        >
          Login
        </Text>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextInput
            label="Username"
            icon={<UserCircle />}
            mt="md"
            name="username"
            variant="filled"
            size="md"
            placeholder="mightyboy"
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
          <Group position="apart" mt="md">
            <Checkbox label="Remember me" />
          </Group>
          <button
            type="submit"
            className="mt-4 w-full bg-teal-200 px-6 py-2 rounded text-teal-900 hover:bg-teal-400 trasnition font-bold"
          >
            {loading ? <Loader size="sm" color="#ffffff" /> : "Sign in"}
          </button>
          {/* <Button color="teal" fullWidth mt="xl" type="submit">
            {loading ? <Loader size="sm" color="#ffffff" /> : "Sign in"}
          </Button> */}
        </form>
      </Paper>
    </Container>
  );
}

export default Register;
