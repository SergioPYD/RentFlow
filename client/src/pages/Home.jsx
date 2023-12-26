import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect } from "react";
import Inquilino from "../components/Home/Inquilino";
import Propietario from "../components/Home/Propietario";
import service from "../services/service.config";

export default function Home() {
  const navigate = useNavigate();
  const { isUserActive, roleDetect, activeUserId } = useContext(AuthContext);



  useEffect(() => {
    if (isUserActive === false) {
      navigate("/");
      console.log("No estas autorizado");
    }
  }, []);

  return <>{roleDetect === "Inquilino" ? <Inquilino /> : <Propietario />}</>;
}
