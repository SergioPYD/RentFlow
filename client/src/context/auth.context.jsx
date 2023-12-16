import { createContext,useEffect,useState } from "react";
import service from "../services/service.config";
import { Spinner } from "@nextui-org/react";
const AuthContext = createContext()


function AuthWrapper(props) {
    const [isUserActive, setisUserActive] = useState(false);
    const [activeUserId, setActiveUserId] = useState(null);
    const [roleDetect, setRoleDetect] = useState(null)
    const [isPageLoading, setIsPageLoading] = useState(true);
  
      useEffect (()=>{
          verifyToken()
      },[])
  
    const verifyToken = async () => {
  
      setIsPageLoading(true) 
  
      try {
        const response = await service.get("/auth/verify");
        setisUserActive(true);
        setActiveUserId(response.data._id);
        setIsPageLoading(false)
        setRoleDetect(response.data.role);
      } catch (error) {
        console.log(error);
        setisUserActive(false);
        setActiveUserId(null);
        setIsPageLoading(false)
        setRoleDetect(null);
      }
    };
    const passedContext = {
      verifyToken, // Para validar el token en login, volver a la app, quitar
      isUserActive, // Mostrar enlaces dependiendo de si el user esta logeado o no- Ver paginas privadas
      activeUserId, // para mostrar funcionalidades de borrar/editar solo cuando el usuario sea el dueño de un documento
      roleDetect, // Para verificar si el User tiene rol de Propietario o Inquilino
    };
  
    // CLAUSLA DE GUARDIA PARA TODA LA PAGINA
  

    
    if (isPageLoading===true) {
      return <Spinner color="primary" style={{paddingTop:"20px"}}/>;
    }
  
    return (
      <AuthContext.Provider value={passedContext}>
        {props.children}
      </AuthContext.Provider>
    );
  }
  
  export { AuthContext, AuthWrapper };
  