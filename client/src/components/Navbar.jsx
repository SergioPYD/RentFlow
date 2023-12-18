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
import Login from "../components/Login";

export default function NavbarPrimary() {
  const navigate = useNavigate();
  const { isUserActive } = useContext(AuthContext);

  const checkActive = (info) => {
    if (info.isActive) {
      return "navLinkHome";
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">RENTFLOW</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink to="/inquilinos" className={checkActive} end={true}>
            INQUILINOS
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to="/" className={checkActive} aria-current="page">
            HOME
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to="/propietarios" className={checkActive} end={true}>
            PROPIETARIOS
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Login />
        </NavbarItem>
        <NavbarItem>
          <Button color="primary" end={true} variant="flat">
            <NavLink to="/signup">Registrate</NavLink>
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
              navigate("/inquilinos");
            }}
            size="lg"
            
            end={true}
          >
            INQUILINOS
          </NavLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              navigate("/propietarios");
            }}
            size="lg"
            
            end={true}
          >
            PROPIETARIOS
          </NavLink>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
