import { useEffect } from "react";
import { useContext, createContext, useState } from "react";

const AuthContext = createContext({});

export const useUser = () => useContext(AuthContext);
function AuthenticationProvider({ children }) {
  const [user, setUser] = useState({ isLoggedin: false, username: null });
  const [isLoading, setisLoading] = useState(false);
  async function verifyUser(token) {
    const res = await fetch("http://localhost:5000/verify-user", {
      method: "GET",
      headers: {
        token,
      },
    });
    const response = await res.json();
    if (response.status) {
      setUser({ isLoggedin: true, username: response.user.username });
    }
  }

  useEffect(() => {
    setisLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      verifyUser(token);
    }
    setisLoading(false);
  }, []);

  if (isLoading) {
    return "Loding";
  }
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthenticationProvider;
