import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function Privateroutes({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    
    axios.get("http://localhost:5000/api/v1/users/me", {
      withCredentials: true 
    })
    .then(res => {
      console.log("User authenticated ", res.data);
      setIsAuthenticated(true);
    })
    .catch(err => {
      console.log("Notlogged in", err.message);
      setIsAuthenticated(false);
    });
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default Privateroutes;
