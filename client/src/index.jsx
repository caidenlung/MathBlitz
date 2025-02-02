import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Login from "./components/pages/Login";
import NotFound from "./components/pages/NotFound";
import Home from "./components/pages/Home";
import Play from "./components/pages/Play";
import Stats from "./components/pages/Stats";
import Leaderboard from "./components/pages/Leaderboard";
import Duel from "./components/pages/Duel";
import CreateDuel from "./components/modules/duel-modules/CreateDuel";
import JoinDuel from "./components/modules/duel-modules/JoinDuel";
import DuelPlay from "./components/modules/duel-modules/DuelPlay";
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
      <Route path="/stats" element={<Stats />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/duel" element={<Duel />} />
      <Route path="/createduel" element={<CreateDuel />} />
      <Route path="/joinduel" element={<JoinDuel />} />
      <Route path="/duelplay" element={<DuelPlay />} />
    </Route>
  )
);

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
