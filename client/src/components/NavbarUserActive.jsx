import { AuthContext } from "../context/auth.context";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";


export default function NavbarUserActive() {
  const navigate = useNavigate();
  const { isUserActive, roleDetect, verifyToken } = useContext(AuthContext);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const checkActive = (info) => {
    if (info.isActive) {
      return "navLinkHome";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    verifyToken();
    navigate("/");
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NavLink to="/home" >

          <p className="font-bold text-inherit">RENTFLOW</p>

          </NavLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          
          <NavLink to= {roleDetect === "Inquilino" ? "/piso" : "/propiedades"} className={checkActive} end={true}>
            {roleDetect === "Inquilino" ? "TU ALQUILER" : "TUS PROPIEDADES"}
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to="/home" className={checkActive} aria-current="page">
            HOME
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to="/perfil" className={checkActive} end={true}>
            TU PERFIL
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
        <Button onClick={handleLogout} key="logout" color="danger">
            <p>Cerrar Sesion</p>
          </Button>
        </NavbarItem>
        
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <NavLink
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              navigate("/");
            }}
            size="lg"
            
            aria-current="page"
          >
            HOME
          </NavLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              {roleDetect === "Inquilino" ? navigate("/inquilinos") : navigate("/propiedades")}
              ;
            }}
            size="lg"
            
            end={true}
          >
             {roleDetect === "Inquilino" ? "TU ALQUILER" : "TUS PROPIEDADES"}
          </NavLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              navigate("/perfil");
            }}
            size="lg"
            
            end={true}
          >
            TU PERFIL
          </NavLink>

        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink
            onClick={handleLogout}
            size="lg"
            style={{color:"red"}}
            end={true}
          >
            Cerrar sesión
          </NavLink>
          
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
