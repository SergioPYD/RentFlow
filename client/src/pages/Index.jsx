import { useNavigate} from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect } from "react";

export default function Index() {

  const navigate = useNavigate();
  const { isUserActive } = useContext(AuthContext);
  
  useEffect(() => {
      if (isUserActive === true){
          navigate("/home")
          
      } 
    }, []);


    return (
      <div>REGISTRATE EN ESTA FANTASTICA PAGINA</div>
    )
  }
  