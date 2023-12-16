
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

import Logged from "./Navbar/Logged";
import NotLogged from "./Navbar/NotLogged";

export default function Navbar() {
  const { isUserActive } = useContext(AuthContext);

  return <>{isUserActive === true ? <Logged /> : <NotLogged />}</>;
}
