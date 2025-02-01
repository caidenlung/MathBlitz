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
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center px-4">
      {userId ? (
        <button
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
          className="px-8 py-4 text-sm font-medium text-emerald-400 hover:text-emerald-300 border border-emerald-800/50 hover:border-emerald-700 rounded transition-all duration-200"
        >
          Logout
        </button>
      ) : (
        <div className="space-y-12 -mt-32">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-emerald-400 mb-4">mathblitz</h1>
            <p className="text-zinc-400 text-lg">login to continue</p>
          </div>
          <div className="bg-zinc-800/50 rounded-lg px-10 py-8 border border-zinc-700">
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  handleLogin(credentialResponse);
                  navigate("/home");
                }}
                onError={(err) => console.log(err)}
                theme="filled_black"
                shape="pill"
                size="large"
                text="continue_with"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
