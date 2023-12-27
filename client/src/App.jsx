import "./App.css";

import { useContext } from "react";
import { AuthContext } from "./context/auth.context";
import { Route, Routes } from "react-router-dom";


import NavbarPrimary from "./components/Navbar";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Propiedades from "./pages/Propiedades";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";
import NavbarUserActive from "./components/NavbarUserActive";
import Propietario from "./pages/Propietarios";
import Inquilino from "./pages/Inquilinos";
import Detalles from "./components/Propiedades/Detalles";



function App() {
  const { isUserActive } = useContext(AuthContext);
  return (
    <>
      {isUserActive ? <NavbarUserActive /> : <NavbarPrimary />}

      <div className="body">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/propietarios" element={<Propietario />} />
          <Route path="/inquilinos" element={<Inquilino />} />

          <Route path="/propiedades" element={<Propiedades />} />
          <Route path="/propiedades/:idPiso" element={<Detalles />} />

          <Route path="/error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
