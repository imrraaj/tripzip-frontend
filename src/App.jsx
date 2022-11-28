import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Hotel from "./pages/HotelDetails";
import AuthState from "./context/AuthContext";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import { Container, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Navbar from "./components/Navbar";
import { FooterSocial } from "./components/FooterBottom";

function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: "'Inter', sans-serif",
        primaryColor: "teal",
        headings: {
          fontFamily: "'Montserrat', sans-serif",
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <NotificationsProvider position="top-right">
        <AuthState>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/hotel/:id" element={<Hotel />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <FooterSocial />
          </Router>
        </AuthState>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
