import { useNavigate} from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect } from "react";


export default function Home() {
    const navigate = useNavigate();
    const { isUserActive, roleDetect ,activeUserId } = useContext(AuthContext);
    
    useEffect(() => {
        if (isUserActive === false){
            navigate("/")
            console.log("No estas autorizado")
        } 
      }, []);

   

  return (
    <div className="mt-10">
        Bienvenido a tu perfil {roleDetect} {activeUserId}
    </div>
  )
}
