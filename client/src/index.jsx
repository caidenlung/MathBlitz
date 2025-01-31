import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Login from "./components/pages/Login";
import NotFound from "./components/pages/NotFound";
import Home from "./components/pages/Home";
import Play from "./components/pages/Play";
import Settings from "./components/pages/Settings";
import "./styles.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "927961037884-d14v6erf0d523objjaeqo3e7bahain68.apps.googleusercontent.com";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/play" element={<Play />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
  )
);

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
