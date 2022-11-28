import { Link, Navigate } from "react-router-dom";
import { useUser } from "../context/AuthContext";
import { useEffect } from "react";
function Protected({ children }) {
  const { user, setUser } = useUser();
  if (user.isLoggedin) {
    return children;
  } else {
    return (
      <>
        <Navigate to="/login" replace={true} />
      </>
    );
  }
}

export default Protected;
