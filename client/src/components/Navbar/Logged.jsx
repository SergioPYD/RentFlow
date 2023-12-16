import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import { Button } from "@nextui-org/react";

export default function Logged() {
  const navigate = useNavigate();
  const { verifyToken } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    verifyToken();
    navigate("/");
  };

  return (
    <nav>
      <Button onClick={handleLogout} className="primary">
        {" "}
        Cerrar sesion
      </Button>
      <br /> <div>"Home"</div>
    </nav>
  );
}
