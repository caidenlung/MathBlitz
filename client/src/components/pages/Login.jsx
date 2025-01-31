import React, { useContext, useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

import "../../utilities.css";

const Login = () => {
  const navigate = useNavigate();
  const { userId, handleLogin, handleLogout } = useContext(UserContext);

  useEffect(() => {
    if (userId) {
      navigate("/home");
    }
  }, [userId, navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {userId ? (
        <button
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <div className="space-y-8">
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold mb-4"> Welcome to MathBlitz!</h1>
          </div>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleLogin(credentialResponse);
                navigate("/home");
              }}
              onError={(err) => console.log(err)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
