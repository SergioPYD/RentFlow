import React from "react";
import Login from "../Login";
import { NavLink } from "react-router-dom";

export default function NotLogged() {
  return (
    <nav>
      <Login />
      <NavLink to="/">Home</NavLink>
      <br />
      <NavLink to="/signup">Registrate</NavLink>
    </nav>
  );
}
