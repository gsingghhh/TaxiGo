import React, { useContext, useEffect } from "react";
import axios from "axios";
import { captainDataContext } from "../context/CaptainContext.jsx";
import { useNavigate } from "react-router-dom";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { isLoading, setIsLoading, setCaptain } = useContext(captainDataContext);
  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    } else {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            setCaptain(response.data.captain);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log("error", err);
          setIsLoading(false)
          localStorage.removeItem("token");
          navigate("/captain-login");
        });
    }
  });

  if (isLoading) {
    return <div>Is Loading...</div>;
  }
  return <>{children}</>;
};

export default CaptainProtectWrapper;
